import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import PlantCard from "../../components/PlantCard";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';

const Home = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const { user } = useUser();
  const [plantList, setPlantList] = useState<{ 
    id: string; 
    title: string; 
    disease: string; 
    image: string 
  }[]>([
    { id: "1",  title: "Apple",     disease: "scab",                          image: "" },
    { id: "2",  title: "Apple",     disease: "black rot",                    image: "" },
    { id: "3",  title: "Apple",     disease: "cedar apple rust",             image: "" },
    { id: "4",  title: "Apple",     disease: "healthy",                      image: "" },
    { id: "5",  title: "Background",disease: "without leaves",               image: "" },
    { id: "6",  title: "Blueberry", disease: "healthy",                      image: "" },
    { id: "7",  title: "Cherry",    disease: "powdery mildew",               image: "" },
    { id: "8",  title: "Cherry",    disease: "healthy",                      image: ""  },
    { id: "9",  title: "Corn",      disease: "gray_leaf_spot",               image: "" },
    { id: "10", title: "Corn",      disease: "common_rust",                  image: "" },
    { id: "11", title: "Corn",      disease: "northern_leaf_blight",         image: "" },
    { id: "12", title: "Corn",      disease: "healthy",                      image: "" },
    { id: "13", title: "Grape",     disease: "black_rot",                    image: "" },
    { id: "14", title: "Grape",     disease: "black_measles",                image: "" },
    { id: "15", title: "Grape",     disease: "leaf_blight",                  image: "" },
    { id: "16", title: "Grape",     disease: "healthy",                      image: "" },
    { id: "17", title: "Orange",    disease: "haunglongbing",                image: "" },
    { id: "18", title: "Peach",     disease: "bacterial_spot",               image: "" },
    { id: "19", title: "Peach",     disease: "healthy",                      image: "" },
    { id: "20", title: "Pepper",    disease: "bacterial_spot",               image: "" },
    { id: "21", title: "Pepper",    disease: "healthy",                      image: "" },
    { id: "22", title: "Potato",    disease: "early_blight",                 image: "" },
    { id: "23", title: "Potato",    disease: "healthy",                      image: "" },
    { id: "24", title: "Potato",    disease: "late_blight",                  image: "" },
    { id: "25", title: "Raspberry", disease: "healthy",                      image: "" },
    { id: "26", title: "Soybean",   disease: "healthy",                      image: "" },
    { id: "27", title: "Squash",    disease: "powdery_mildew",               image: "" },
    { id: "28", title: "Strawberry",disease: "healthy",                      image: "" },
    { id: "29", title: "Strawberry",disease: "leaf_scorch",                  image: "" },
    { id: "30", title: "Tomato",    disease: "bacterial_spot",               image: "" },
    { id: "31", title: "Tomato",    disease: "early_blight",                 image: "" },
    { id: "32", title: "Tomato",    disease: "healthy",                      image: "" },
    { id: "33", title: "Tomato",    disease: "late_blight",                  image: "" },
    { id: "34", title: "Tomato",    disease: "leaf_mold",                    image: "" },
    { id: "35", title: "Tomato",    disease: "septoria_leaf_spot",           image: "" },
    { id: "36", title: "Tomato",    disease: "spider_mites_two-spotted_spider_mite", image: "" },
    { id: "37", title: "Tomato",    disease: "target_spot",                  image: "" },
    { id: "38", title: "Tomato",    disease: "mosaic_virus",                 image: "" },
    { id: "39", title: "Tomato",    disease: "yellow_leaf_curl_virus",       image: "" },
  ]);
  

  useEffect(() => {
    getPlants();
  }, []);

  console.log(title);

  const MONGODBURL = "https://plantid-zry5.onrender.com/plants";

  const getPlants = async () => {
    try {
      const result = await axios.get(MONGODBURL);
      setPlantList(result.data);
    } catch (error) {
      console.error("Failed to get plant list: ", error);
    }
  };

  // Create Plant
  const handlePostPlant = async () => {
    console.log("Hit handle post");
    try {
      await axios.post(MONGODBURL, { title });
      getPlants();
      setTitle("");
      console.log("Post Plant Sucessful");
    } catch (error) {
      console.error("Failed to post plant: ", error);
    }
  };

  // Delete
  const handleDeletePlant = async (id: string) => {
    try {
      // await axios.delete(`${MONGODBURL}/${id}`);
      // Remove the deleted plant from the state
      setPlantList((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete plant: ", error);
    }
  };

  // Update
  const handlePutPlant = async (id: string) => {
    try {
      // await axios.put(`${MONGODBURL}/${plant._id}`, {title: newTitle});
      getPlants();
      setNewTitle("");
    } catch (error) {
      console.error("Failed to update plant: ", error);
    }
  };

  const openCamera = () => {
    navigation.navigate("camera");
  };
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => signOut({ redirectUrl: "/" })}
        >
          <Entypo style={styles.flipped} name="login" size={40} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Plant Gallery</Text>
        <TouchableOpacity onPress={() => openCamera()}>
          <View style={styles.addWrapper}>
            <Icon name="camera" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      {/* All plants in gallery */}
      <View style={styles.galleryWrapper}>
        {plantList.length === 0 ? (
          <Text style={styles.noPlantsText}>Add Plants</Text>
        ) : (
          <ScrollView>
            {plantList &&
              plantList.map((plant, index) => (
                <PlantCard
                  key={plant.id}
                  text={plant.title}
                  disease={plant.disease}
                  plantId={plant.id}
                  onDelete={handleDeletePlant}
                />
              ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addWrapper: {
    width: 60,
    height: 50,
    backgroundColor: "white", // Ensure it's a contrasting color
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  galleryWrapper: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  photos: {
    marginTop: 20,
  },

  addText: {
    color: "black", // Ensure text is visible
    fontSize: 24,
    fontWeight: "bold",
  },
  noPlantsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
  },
  plant: {},
  flipped: {
    width: 60,
    height: 50,
    transform: [{ rotateY: '180deg' }],
  },
});

export default Home;
