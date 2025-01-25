import { CameraView, CameraType, useCameraPermissions, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions(); // Always call this hook unconditionally
  const cameraRef = useRef<CameraView | null>(null); // Always define hooks unconditionally

  const [flash, FlashMode] = useState<FlashMode>("off");

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
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
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
          <TouchableOpacity style={styles.cameraFlipButton} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={45} color="white" />
          </TouchableOpacity>
          
        </View>
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.takePicButton} onPress={takePic}>
            <Ionicons name="radio-button-on" size={75} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <FontAwesome name="flash" size={24} color="white" />
          </TouchableOpacity>
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
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    margin: 34,
  },
  cameraFlipButton: {
    position: "absolute",
    top: 30, // Position from the top
    right: -10, // Position from the right
    backgroundColor: "rgba(0, 0, 0, 0.25)", // Gray transparent background
    width: 60, // Circle width
    height: 60, // Circle height
    borderRadius: 25, // Half of width/height to make it circular
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
  },
  flashButton: {
    position: "absolute",
    top: -530, // Position from the top
    left: -10, // Position from the right
    backgroundColor: "rgba(0, 0, 0, 0.25)", // Gray transparent background
    width: 60, // Circle width
    height: 60, // Circle height
    borderRadius: 25, // Half of width/height to make it circular
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
  },
  takePicButton: {
    position: "absolute", 
    bottom: -180, 
    alignSelf: "center", 
    backgroundColor: "transparent", 
  },

  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
