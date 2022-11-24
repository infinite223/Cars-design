import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/index';
import ProfileScreen from './screens/Profile/index';
import MeetingRoomScreen from './screens/MeetingRoom/index';
import CreateScreen from './screens/CreateProject/index';
import SettingsScreen from './screens/Settings/index';
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/themeSlice';
import _Icon  from 'react-native-vector-icons/Entypo'
import { Icon } from '@rneui/themed';
import MeetingScreen from './screens/Meeting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from './screens/Chats/index';
import ProjectScreen from './screens/Project/index';
import { HomeStack } from './HomeStack';

export const TabsNavigator = () => {

    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()
    const theme = useSelector(selectTheme)

  return (
        <Tab.Navigator screenOptions={{
            headerShadowVisible: false,
            headerStyle:{
              backgroundColor:theme.background
            },
            tabBarStyle: {
                backgroundColor:theme.background,
                borderTopWidth:0,
                height:65,
                
            },
            tabBarLabelStyle:{color:theme.fontColorContent, marginBottom:10}
          }}>
            <Tab.Screen name="Home" component={HomeStack} options={
              {headerShown:false,tabBarIcon: () => <_Icon name='home' size={24} color={theme.fontColor} style={{paddingTop:8}}/>}}
            />
            <Tab.Screen name="Meeting" component={MeetingScreen} options={
              {tabBarIcon: () => <Icon type='ionicon' name='people' size={24} color={theme.fontColor} style={{paddingTop:5}}/>}} 
            />
            {/* <Tab.Screen name='Settings' component={SettingsScreen}/> */}
            <Tab.Screen name='Create' component={CreateScreen} options={
              {tabBarIcon: () => <_Icon name='plus' size={24} color={theme.fontColor} style={{paddingTop:5}}/>}} 
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={
              {tabBarIcon: () => <Icon type='ionicon' name='person-circle' size={24} color={theme.fontColor} style={{paddingTop:5}}/>}} 
            />
          </Tab.Navigator>
    );
}