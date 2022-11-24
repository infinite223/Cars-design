import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/themeSlice';
import HomeScreen from './screens/Home/index';
import ChatsScreen from './screens/Chats/index';
import ProjectScreen from './screens/Project/index';

export const HomeStack = () => {
    const Stack = createNativeStackNavigator()
    const theme = useSelector(selectTheme)
  return (
   
              <Stack.Navigator screenOptions={{
              headerShadowVisible: false,
              headerStyle:{
                backgroundColor:theme.background
              },
              }}>
                <Stack.Screen name='HomeS' component={HomeScreen}/> 
                 <Stack.Screen name='Chats' component={ChatsScreen}/>
        <Stack.Screen name='Project' component={ProjectScreen}/>
    </Stack.Navigator>         
  )
}

