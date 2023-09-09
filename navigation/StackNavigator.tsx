import { View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './../screens/Login'
import ProfileScreen from './../screens/Profile'
import ProjectScreen from './../screens/Project'
import SettingsScreen from './../screens/Settings'
import ChatsScreen from './../screens/Chats'
import useAuth, { auth } from './../hooks/useAuth'
import MyCamera from './../screens/Camera'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsNavigator } from './TabsNavigator'
import EditProfileScreen from './../screens/EditProfile/index';
import ChatScreen from '../screens/Chat'
import SearchScreen from './../screens/Search/index';
import MeetingRoomScreen from '../screens/MeetingRoom'
import ReportScreen from '../screens/Report'
import CreateMeeting from '../screens/CreateMeeting'
import TermsScreen from '../screens/Terms'
import ReviewsScreen from '../screens/Reviews'
import CreateScreen from '../screens/CreateProject'
import CreateProblem from '../screens/CreateProblem'
import CreateProject from '../screens/CreateProject'
import { ProblemScreen } from '../screens/Problem'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const StackNavigator = () => {
  const { user } :any = useAuth()
  const theme = useSelector(selectTheme)
  const navigation:any = useNavigation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)

      if(!user) {
        navigation.navigate('Login')
      }
    })
  }, [])

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
            <Stack.Screen name='Problem' component={ProblemScreen}/>
            <Stack.Screen name='Chats' component={ChatsScreen}/>
            <Stack.Screen name='Chat' component={ChatScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>               
            <Stack.Screen name='Camera' component={MyCamera}  options={{headerShown:false}}/>
            <Stack.Screen name='Settings' component={SettingsScreen}/>
            <Stack.Screen name='Search' component={SearchScreen}/>
            <Stack.Screen name='EditProfile' component={EditProfileScreen}/> 
            <Stack.Screen name='Report' component={ReportScreen}/>   
            <Stack.Screen name='MeetingRoom' component={MeetingRoomScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen 
              name='CreateMeeting' 
              component={CreateMeeting} 
            />
            <Stack.Screen name='CreateProject' component={CreateProject}/>
            <Stack.Screen 
              name='CreateProblem' 
              component={CreateProblem} 
            />
            <Stack.Screen name="Reviews" component={ReviewsScreen}/>

          </>:
          <Stack.Screen name='Login' component={LoginScreen}/>
        } 
    </Stack.Navigator></>
  )
}

export default StackNavigator