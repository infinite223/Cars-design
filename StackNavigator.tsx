import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProjectScreen from './screens/ProjectScreen'
import CreateScreen from './screens/CreateScreen'
import useAuth from './hooks/useAuth'
import EditProfileScreen from './screens/modals/EditProfileScreen';

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } :any = useAuth()
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false,}}>
        {user ?
          <>
          <Stack.Group>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='Project' component={ProjectScreen}/>
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal',  headerShown:false}}>
            {/* <Stack.Screen name='EditProfile' component={EditProfileScreen}/> */}
          </Stack.Group>   
          </>:
          <Stack.Screen name='Login' component={LoginScreen}/>
        } 
    </Stack.Navigator>
  )
}

export default StackNavigator