import { Button } from 'react-native'
import React from 'react'
import { useClerk } from "@clerk/clerk-expo";


export default function signOut() {

    const {signOut} = useClerk()

  return (
    <Button title='Sign Out' onPress={() => signOut({redirectUrl : '/'})} />
  )
}