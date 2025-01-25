import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function index() {
  const [title, setTitle] = useState<string>("");
  const [plantList, setPlantList] = useState<string[]>([]);

  useEffect(() => {
    getPlants();
  }, []);

  console.log(title);

  const MONGODBURL = "http://localhost:3000/plants";

  const handlePostPlant = async () => {
    console.log("Hit handle post");
    try {
      await axios.post(MONGODBURL, { title: title });
      setTitle("");
      console.log("Post Plant Sucessful");
    } catch (error) {
      console.error("Failed to post plant: ", error);
    }
  };

  const getPlants = async () => {
    try {
      const result = await axios.get(MONGODBURL);
      setPlantList(result.data);
    } catch (error) {
      console.error("Faily to get plant list: ", error);
    }
  };

  return (
    <View>
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
