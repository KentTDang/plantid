import React from 'react'
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const PlantProfile = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.pcontainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionTitle}>Plant Profile</Text> 
        <TouchableOpacity onPress={() => navigation.navigate("upload")}>
          <View style={styles.backWrapper}>
            <Text style={styles.backButton}>Back</Text>
          </View>
        </TouchableOpacity>
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
});

export default PlantProfile;


