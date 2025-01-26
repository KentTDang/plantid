import { TouchableOpacity, View, Text, StyleSheet} from "react-native";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import PlantCard from '../../components/PlantCard'
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const Home = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const { user } = useUser();
  const [plantList, setPlantList] = useState<{ id: string; title: string }[]>([{ id: "1", title: "Temporary Plant" },]);

  useEffect(() => {
    getPlants();
  }, []);

  console.log(title);

  const MONGODBURL = "http://localhost:3000/plants";

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
      getPlants()
      setTitle("");
      console.log("Post Plant Sucessful");
    } catch (error) {
      console.error("Failed to post plant: ", error);
    }
  };

  // Delete
  const handleDeletePlant = async ( id: string ) => {
    try {
      await axios.delete(`${MONGODBURL}/${id}`);
      getPlants();
    } catch (error) {
      console.error("Failed to delete plant: ", error);
    }
  };

  // Update
  const handlePutPlant = async ( id: string ) => {
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

  return (
    <View style = {styles.container}>
        <View style={styles.headerWrapper}>
            <Text style={styles.sectionTitle}>Plant Gallery</Text> 
            <TouchableOpacity onPress={() => openCamera()}>
                <View style={styles.addWrapper}>
                  <Icon name="camera" size={30}/>
                </View>
            </TouchableOpacity>
        </View>
        {/* All plants in gallery */}
        <View style = {styles.galleryWrapper}>
            {plantList.length === 0 ? (
              <Text style={styles.noPlantsText}>Add Plants</Text> ) : (
            <ScrollView> 
              {plantList && plantList.map((plant, index) => (          
                <PlantCard 
                  key={plant.id} 
                  text={plant.title} 
                  plantNumber={index + 1}
                  onDelete={() => handleDeletePlant(plant.id)}
                  />
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
        paddingBottom: 15,
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
        borderColor: 'black',
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


export default Home;
