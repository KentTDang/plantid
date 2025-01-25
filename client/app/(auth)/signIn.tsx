import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        console.log('SIGN IN GOOD BROTHER');
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      {/* Welcome back text */}
      <Text style={styles.welcomeText}>Welcome back!</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="8 characters or more"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.grayLine} />

      <View style={styles.signupContainer}>
        <Text style="">Don't have an account?</Text>
        <Link href="/signUp" asChild>
            <Text style={styles.signUpButtonText}>    Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 70,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#a7c957',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#a7c957',
    borderWidth: 3,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  signInButton: {
    backgroundColor: '#a7c957', // Dark green background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "center"
  },
  signUpButton: {
    backgroundColor: '#a7c957', // Dark green background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#a7c957', // White text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  grayLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc', // Gray color for the line
    marginVertical: 20, // Space above and below the line
  },

});
