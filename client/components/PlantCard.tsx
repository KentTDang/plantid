import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


interface PlantCardProps {
    text: string;
    plantNumber: number;
}

const PlantCard = ({ text, plantNumber }: PlantCardProps) => {
    const navigation = useNavigation<any>();

    const openProfile = () => {
        navigation.navigate("PlantProfile");
    }

  return (
    <TouchableOpacity style={styles.items} onPress={() => openProfile()}>
        <View style={styles.itemLeft}>
            <Icon name="leaf" size={30} color="#a7c957" />
            <Text style={styles.itemsText}>
                Plant {plantNumber}: {text}
                </Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    items: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemsText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
    },
});

export default PlantCard;