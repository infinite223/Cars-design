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
import { Text } from 'react-native'
import { LoadingView } from '../components/LoadingView'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const StackNavigator = () => {
  const { user, loading } :any = useAuth()
  const theme = useSelector(selectTheme)
  const navigation:any = useNavigation()
  const colorsGradient_2 = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if(!user) {
        navigation.navigate('Login')
      }
    })
  }, [])
  

  return (<>
    {loading&&
      <View style={{ 
        position: 'absolute',
        top:0,
        left:0,
        zIndex:5,
        height: '100%', 
        width: '100%', 
        alignItems:'center',
        justifyContent:'center'
      }}>
      <LoadingView headerText={'Loading...'}/>
    </View>}


    <Stack.Navigator screenOptions={{
     headerShadowVisible: false,
     statusBarColor:'black',
     headerStyle: {backgroundColor:'black'},
     animation: 'slide_from_right',
     animationDuration: 0.01
    }}>
        {user ?
          <>    
            <Stack.Screen name='User' component={TabsNavigator} options={{headerShown:false}}/>
            <Stack.Screen 
              name='Project' 
              component={ProjectScreen}
              options={{headerStyle: {backgroundColor: 'black'}}}
            />
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
            <Stack.Screen name='CreateProject' 
              options={{ statusBarColor:colorsGradient_2[1]}}
              component={CreateProject}
            />
            <Stack.Screen 
              name='CreateProblem' 
              options={{statusBarColor:colorsGradient_2[1]}}
              component={CreateProblem} 
            />
            <Stack.Screen name="Reviews" component={ReviewsScreen}/>
          </>:
          <Stack.Screen 
            name='Login' 
            component={LoginScreen}
            options={{ 
              statusBarColor: colorsGradient_2[0],   
            }}
          />
        } 
    </Stack.Navigator></>
  )
}

export default StackNavigator