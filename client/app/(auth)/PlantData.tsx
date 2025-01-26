import React from 'react';
import { useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileSection from './ProfileSection';

interface PlantProfileProps {
  name: string;
  image: any;
  health: string;
}

const PlantProfile = ({name, image, health}: PlantProfileProps) => {
  const navigation = useNavigation<any>();
  
  const openHome = () => {
    navigation.navigate("home");
  }

  const goCam = () => {
    navigation.navigate("camera");
  }

  const [profiles, setProfiles] = useState([
    { name, image, health },
  ]);

  const addProfile = () => {
    const newProfile = {
      name: `New Plant ${profiles.length + 1}`,
      image,
      health: 'Unknown',
    };
    setProfiles([...profiles, newProfile]);
  };

  return (
    <View style={styles.pcontainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionTitle}>Plant Profile</Text> 
        <TouchableOpacity onPress={() => openHome()}>
          <View style={styles.backWrapper}>
            {/* <Text style={styles.backButton}>Back</Text> */}
            <Icon name="arrow-left" size={30} />
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => addProfile()} style={styles.addWrap}>
            <Text style={styles.addPrompt}>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

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

