import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image} from "react-native";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import PlantCard from '../../components/PlantCard';
import { ScrollView } from "react-native";

export default function index() {
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const navigation = useNavigation<any>();
  const [plantList, setPlantList] = useState<string[]>(["Cactu"]);
  const [photo, setPhoto] = useState();

  const handlePhoto = () => {
    console.log(photo);
  };

  useEffect(() => {
    getPlants();
  }, []);

  console.log(title);

  const MONGODBURL = "http://172.20.10.3:3000/plants";

  const getPlants = async () => {
    try {
      const result = await axios.get(MONGODBURL);
      setPlantList(result.data);
    } catch (error) {
      console.error("Faily to get plant list: ", error);
    }
  };

//   Update to breakout to camera page
  const handlePostPlant = async () => {
    console.log("Hit handle post");
    try {
      await axios.post(MONGODBURL, { title: title });
      getPlants()
      setTitle("");
      console.log("Post Plant Sucessful");
    } catch (error) {
      console.error("Failed to post plant: ", error);
    }
  };

  // Delete
  const handleDeletePlant = async (plant: any) => {
    try {
      await axios.delete(`${MONGODBURL}/${plant._id}`);
      getPlants();
    } catch (error) {
      console.error("Failed to delete plant: ", error);
    }
  };

  // Update
  const handlePutPlant = async (plant: any) => {
    try {
      await axios.put(`${MONGODBURL}/${plant._id}`, {title: newTitle});
      getPlants();
      setNewTitle("");
    } catch (error) {
      console.error("Failed to update plant: ", error);
    }
  };


  const openCamera = () => {
    navigation.navigate("camera");
  };

  return (
    <View style = {styles.container}>
        <View style={styles.headerWrapper}>
            <Text style={styles.sectionTitle}>Plant Gallery</Text> 
            <TouchableOpacity onPress={() => openCamera()}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* All plants in gallery */}
        <View style = {styles.galleryWrapper}>
            {plantList.length === 0 ? (
              <Text style={styles.noPlantsText}>Add Plants</Text> ) : (
            <ScrollView> 
              {plantList.map((plant, index) => (          
                <PlantCard key={index} text={plant} plantNumber={index + 1}/>
              ))}
            </ScrollView>
            )}
        </View>
        

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        },
    headerWrapper: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: "bold",

    },
    addWrapper: {
        width: 90,
        height: 50,
        backgroundColor: 'white', // Ensure it's a contrasting color
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C0C0C0',
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
        color: 'black', // Ensure text is visible
        fontSize: 24,
        fontWeight: 'bold',
    },
    noPlantsText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#777',
      textAlign: 'center',
      marginTop: 20,
    },
    input: {
        borderWidth: 3,
    },
    plant: {

    },
  
});


