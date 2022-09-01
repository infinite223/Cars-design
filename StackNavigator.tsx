import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } :any = useAuth()
  return (
    <Stack.Navigator>
        {user ?
        <Stack.Screen name='Home' component={HomeScreen}/>:
        <Stack.Screen name='Login' component={LoginScreen}/>} 
    </Stack.Navigator>
  )
}

export default StackNavigator