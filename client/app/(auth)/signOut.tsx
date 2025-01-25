import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useClerk } from "@clerk/clerk-expo";

export default function SignOut() {
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => signOut({ redirectUrl: '/' })}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center', // Center the button horizontally
  },
  button: {
    backgroundColor: '#a7c957', // Dark green background
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});
