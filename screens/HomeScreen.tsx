import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
  const { logout }:any = useAuth()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='logout' onPress={logout}/>
    </View>
  )
}

export default HomeScreen