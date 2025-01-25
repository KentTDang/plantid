import { TouchableOpacity, View, Text, TextInput, StyleSheet, Button } from "react-native";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-expo';


const Home =() => {
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const { user } = useUser();
  const [plantList, setPlantList] = useState<string[]>([]);

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
      console.error("Faily to get plant list: ", error);
    }
  };

  // Create Plant
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

  return (
    <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 20, }}>
			    <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
		  </View>
      <Text style={styles.sectionTitle}>Plant Gallery</Text>
      <TextInput
        placeholder="add plant"
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
        value={title}
      ></TextInput>
      <Button onPress={handlePostPlant} title="ADD PLANT" />
      <Text>index</Text>

      <View>
        {plantList &&
          plantList.map((plant: any, index) => (
            <View key={index}>
              <Text>{plant.title}</Text>
              <TextInput
                placeholder="Edit plant"
                style={styles.input}
                onChangeText={(text) => setNewTitle(text)}
                value={newTitle}
              ></TextInput>
              <Button title="Edit" onPress={() => handlePutPlant(plant)}></Button>
              <Button
                title="Delte"
                onPress={() => handleDeletePlant(plant)}
              ></Button>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
  },
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
plant: {

},
});

export default Home;
