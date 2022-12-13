import { View} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './../screens/Login'
import ProfileScreen from './../screens/Profile'
import ProjectScreen from './../screens/Project'
import SettingsScreen from './../screens/Settings'
import ChatsScreen from './../screens/Chats'
import useAuth from './../hooks/useAuth'
import MyCamera from './../screens/Camera'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsNavigator } from './TabsNavigator'
import EditProfileScreen from './../screens/EditProfile/index';
import GroupsScreen from '../screens/Groups'
import ChatScreen from '../screens/Chat'
import SearchScreen from './../screens/Search/index';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
            <Stack.Screen name='User' component={TabsNavigator} options={{headerShown:false}}/>
            <Stack.Screen name='Project' component={ProjectScreen}/>
            <Stack.Screen name='Groups' component={GroupsScreen}/>
            <Stack.Screen name='Chats' component={ChatsScreen}/>
            <Stack.Screen name='Chat' component={ChatScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>               
            <Stack.Screen name='Camera' component={MyCamera}  options={{headerShown:false}}/>
            <Stack.Screen name='Settings' component={SettingsScreen}/>
            <Stack.Screen name='Search' component={SearchScreen}/>
            <Stack.Screen name='EditProfile' component={EditProfileScreen}/>  
          </>:
          <Stack.Screen name='Login' component={LoginScreen}/>
        } 
    </Stack.Navigator></>
  )
}

export default StackNavigator