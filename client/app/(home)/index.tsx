import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import SignOutButton from '../(auth)/signOut'

export default function Page() {
  const { user } = useUser()

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/signIn">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/signUp">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}