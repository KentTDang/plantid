import { View, Text, TextInput, StyleSheet, Button } from "react-native";
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

  const MONGODBURL = "https://plantid-zry5.onrender.com/plants";

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
    <View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
		</View>
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
});

export default Home;
