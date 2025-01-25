import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React from "react";
import axios from 'axios'
import { useEffect, useState } from "react";

export default function index() {
  const [title, setTitle] = useState<string>("");

  console.log(title)

  const MONGODBURL = "http://localhost:3000/plants"

  const handlePostPlant = async() => {
    console.log("Hit handle post");
    try {
        await axios.post(MONGODBURL, {title:title})
        setTitle("")
        console.log("Post Plant Sucessful");
    } catch (error){
        console.error("Failed to post plant: ", error);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="add plant"
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
        value={title}
      ></TextInput>
      <Button onPress={handlePostPlant} title="ADD PLANT"/>
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
  },
});
