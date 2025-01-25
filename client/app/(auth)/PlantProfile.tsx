import React from 'react'
import { Button, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const PlantProfile = (prop: any) => {
  const navigation = useNavigation<any>();
  
  const openUpload = () => {
    navigation.navigate("upload");
  }

  return (
    <View style={styles.pcontainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionTitle}>Plant Profile</Text> 
        <TouchableOpacity onPress={() => openUpload()}>
          <View style={styles.backWrapper}>
            <Text style={styles.backButton}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
            <View style={styles.imageWrapper}>
                <Image style={styles.photoSize} source={require('./t1.png')} />
            </View>
            <Text style={styles.desc}>Description:</Text>
            <Text style={styles.info}>{prop.text}</Text>
            <Text>TBD...</Text>
        </View>
    </View>
  );
}

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
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  backButton: {
    color: 'black', // Ensure text is visible
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
 },
  imageWrapper: {
    height: 256,
    width: 256,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    borderColor: '#black',
    borderWidth: 3,
  },

  desc: {
    fontSize: 25,
    fontWeight: 'bold',

  },

  info: {

  },

  photoSize: {
    height: 250,
    width: 250,
  }

});

export default PlantProfile;

