import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProjectScreen from './screens/ProjectScreen'
import CreateScreen from './screens/CreateScreen'
import SettingsScreen from './screens/SettingsScreen'
import ChatsScreen from './screens/ChatsScreen'
import useAuth from './hooks/useAuth'
import EditProfileScreen from './screens/modals/SettingsModals/EditProfileModal';
import MyCamera from './screens/CameraScreen'
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/themeSlice';
import MeetingRoomScreen from './screens/MeetingRoomScreen';

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } :any = useAuth()
  const theme = useSelector(selectTheme)
  return (<>
    <View style={{ 
      position: 'absolute',
      height: '100%', 
      width: '100%', 
      backgroundColor: theme.background
   }}/>
    <Stack.Navigator screenOptions={{
     headerShadowVisible: false,
     headerStyle:{
      backgroundColor:theme.background
    },
    }}>
        {user ?
          <>
          <Stack.Group>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='Project' component={ProjectScreen}/>
            <Stack.Screen name='Chats' component={ChatsScreen}/>
            <Stack.Screen name='Camera' component={MyCamera} options={{headerShown:false}}/>
            <Stack.Screen name='Settings' component={SettingsScreen}/>
            <Stack.Screen name='Create' component={CreateScreen}/>
            <Stack.Screen name='MeetingRoom' component={MeetingRoomScreen} options={{headerShown:false}}/>
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal',  headerShown:false}}>
            {/* <Stack.Screen name='EditProfile' component= {EditProfileScreen}/> */}
          </Stack.Group>   
          </>:
          <Stack.Screen name='Login' component={LoginScreen}/>
        } 
    </Stack.Navigator></>
  )
}

export default StackNavigator