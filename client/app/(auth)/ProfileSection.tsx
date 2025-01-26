import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

interface PlantProfileProps {
    name: string;
    image: any;
    health: string;
}
  
const profileSection = ({name, image, health}: PlantProfileProps) => {
  
    return (
      <View style={styles.content}>
            <View style={styles.imageWrapper}>
                <Image style={styles.photoSize} source={image} />
            </View>
            <View style={styles.plantInfo}>
                <View>
                    <Text style={styles.plantData}>Species: {name}</Text>
                    <Text style={styles.plantData}>Disease: {health}</Text>
                </View>
            </View>
        </View>
    );
}
profileSection.defaultProps = {
    name: 'Unknown Plant',
    image: require('./t1.png'), // Default image
    health: 'Unknown',
};

  const styles = StyleSheet.create({
  
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
   },
    imageWrapper: {
      height: 262,
      width: 262,
      backgroundColor: 'lightgray',
      borderRadius: 5,
      borderColor: '#black',
      borderWidth: 3,
    },
    photoSize: {
        height: 256,
        width: 256,
    },
    plantInfo: {
        paddingTop: 15,
    },
   plantData: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 2,
   },
  
});
  
export default profileSection;
  
  