import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileSection from './ProfileSection';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface PlantProfileProps {
  name: string;
  image: any;
  health: string;
}

const PlantProfile = ({name, image, health}: PlantProfileProps) => {
  const navigation = useNavigation<any>();


  const [dataSet, setDataSet] = useState <string[]>([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://plantid.zeabur.app/plants')
        setDataSet(response.data)
      } catch(error) {
        console.log("Failed to get data.", error)
      }
      
    })();
  }, []);

  // const MONGODBURL = "https://plantid-zry5.onrender.com/plants";

  // const getPlants = async () => {
  //   try {
  //     const result = await axios.get(MONGODBURL);
  //     setPlantList(result.data);
  //   } catch (error) {
  //     console.error("Failed to get plant list: ", error);
  //   }
  // };


  const openHome = () => {
    navigation.navigate("home");
  }

  const goCam = () => {
    navigation.navigate("camera");
  }

  const [profiles, setProfiles] = useState([
    { name, image, health },
  ]);

  const updateProfile = () => { // plus goes here
    navigation.navigate("camera", { 
      onCapture: (newImage: any, newHealth: string) => {
        const updatedProfile = {
          name: "updated", // same as prev in page
          image: newImage,
          health: newHealth || "Sick",
        };
        setProfiles([...profiles, updatedProfile]);
      },
    });
  };

  return (
    <View style={styles.pcontainer}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => openHome()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Plant Profile</Text> 
      </View>

      
      <ScrollView>
        {profiles.map((profile, index) => (
          <ProfileSection
            key={index}
            name={profile.name}
            image={profile.image}
            health={profile.health}
          />
        ))}

{/* on press this needs to link to camera and re input the new photo before adding to the profile (same name different health value from database) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress= {updateProfile} style={styles.addWrap}>
          <Text style={styles.addPrompt}>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

PlantProfile.defaultProps = {
  name: 'Unknown Plant',
  image: require('./t1.png'), // Default image
  health: 'Unknown',
};

const styles = StyleSheet.create({
  pcontainer: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  headerWrapper: { 
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: "center",
    paddingLeft: 63
  },
  backWrapper: {
    width: 90,
    height: 50,
    backgroundColor: 'white', // Ensure it's a contrasting color
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  backButton: {
    color: 'black', // Ensure text is visible
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  buttonWrapper: {
    alignItems: 'center',
    paddingTop: 15,
  },
  addWrap: {
    width: 90,
    height: 50,
    backgroundColor: 'white', // Ensure it's a contrasting color
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  addPrompt: {
    color: 'black', // Ensure text is visible
    fontSize: 34,
    fontWeight: 'bold',
  }

});

export default PlantProfile;

