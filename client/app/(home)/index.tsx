import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignOutButton from "../(auth)/signOut";
import SignIn from "../(auth)/signIn";

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.welcomeText}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignIn/>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // light background
    paddingTop: 70,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a7c957",
    marginBottom: 20,
  },
  authLinksContainer: {
    flexDirection: "row", // Align buttons horizontally
    justifyContent: "center", // Center buttons
    alignItems: "center", // Center vertically
    flexWrap: "wrap", // Allow buttons to wrap onto the next line if the screen is full
    gap: 15, // Add space between buttons
  },
  link: {
    marginVertical: 10,
  },
  authLinkText: {
    color: "#fff", // White text color
    fontWeight: "bold",
    fontSize: 16,
  },
  buttons: {
    backgroundColor: "#a7c957", // Dark green background
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120, // Ensure buttons have a minimum width
  },
});
