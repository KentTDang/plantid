import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import axios from "axios";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions(); // Always call this hook unconditionally
  const cameraRef = useRef<CameraView | null>(null); // Always define hooks unconditionally
  const [flash, FlashMode] = useState<FlashMode>("off");
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const screenHeight = Dimensions.get("window").height;

  const MONGODBURL = "https://plantid-zry5.onrender.com/plants";

  // If permissions are still loading
  if (!permission) {
    return <View style={styles.container} />;
  }

  // If permissions are not granted
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    FlashMode((curFlash) => (curFlash === "off" ? "on" : "off"));
  }

  const takePic = async () => {
    if (cameraRef.current) {
      try {
        // Capture image and request base64 encoding
        const data = await cameraRef.current.takePictureAsync({ base64: true });

        if (data) {
          // Prepare the image payload
          // const imagePayload = {
          //   image: data.base64, // Base64 string
          //   filename: data.uri.split("/").pop(), // Extract filename from URI
          // };
          
          const tempProfile = {
            name: "Co",
            image: "",
            health: "Sick",
          };

          const onCapture = route.params?.onCapture
          if (onCapture) {
            onCapture(tempProfile.image, tempProfile.health);
          }



          // image goes into MODEL
          // GOES TO DB
          navigation.navigate("PlantData");
          // Pull DB in PlantData
          // from plant Profile make Gallery cards using Species


          // Upload the image to the server
          // try {
          //   await axios.post(MONGODBURL, imagePayload);
          //   console.log("Image successfully uploaded!");
          // } catch (error) {
          //   console.error("Failed to upload image:", error);
          // }
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.log("Camera is not ready");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef} // Assign the ref
        style={styles.camera}
        facing={facing}
        flash={flash}
        ratio="4:3"
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
              <FontAwesome
                name="flash"
                size={25}
                color={flash === "off" ? "black" : "white"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraFlipButton}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons name="flip-camera-ios" size={25} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.middleOpen}>
            <View style={styles.cornerBoxContainer}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={takePic}>
              <Ionicons name="radio-button-on" size={75} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    backgroundColor: "transparent",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  topButtons: {
    flex: 2.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  middleOpen: {
    flex: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtons: {
    flex: 3,
    alignItems: "center",
  },
  cameraFlipButton: {
    padding: 7,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cornerBoxContainer: {
    width: 320,
    height: 320,
    position: "relative",
  },
  corner: {
    width: 30,
    height: 30,
    position: "absolute",
    backgroundColor: "transparent",
    borderColor: "gray",
    
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});

