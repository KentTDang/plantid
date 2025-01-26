import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


interface PlantCardProps {
    text: string;
    plantId: string;
    onDelete: (id: string) => void;

}

const PlantCard = ({ text, plantId, onDelete }: PlantCardProps) => {
    const navigation = useNavigation<any>();

    const openProfile = () => {
        // on open load info from DataBase
        navigation.navigate("PlantData");
    }

    const handlePress = () => {
        onDelete(plantId);
    }

  return (
    // on click should load Plant data from DataBase (using name) into Profile section and open
    <TouchableOpacity style={styles.items} onPress={openProfile}>
        <View style={styles.itemLeft}>
            <Icon name="leaf" size={30} color="#a7c957" />
            <Text style={styles.itemsText}>
                {text}
            </Text>
        </View>
        <View style={styles.checkWrapper}>
            <TouchableOpacity onPress={handlePress}>
                <Icon name="check" size={30} color="#a7c957"/>
            </TouchableOpacity>
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
    checkWrapper: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
});

export default PlantCard;