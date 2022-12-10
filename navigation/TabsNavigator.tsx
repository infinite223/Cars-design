import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/index';
import CreateScreen from '../screens/CreateProject/index';
import SettingsScreen from '../screens/Settings/index';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import _Icon  from 'react-native-vector-icons/Entypo'
import _Icon_MaterialIcons  from 'react-native-vector-icons/Fontisto'
import { Icon } from '@rneui/themed';
import MeetingScreen from '../screens/Meeting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStack } from '../HomeStack';

export const TabsNavigator = () => {

    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()
    const theme = useSelector(selectTheme)

  return (
        <Tab.Navigator screenOptions={{
            headerShadowVisible: false,
            tabBarShowLabel:false,
            headerStyle:{
              backgroundColor:theme.background
            },
            tabBarStyle: {
                backgroundColor:theme.background,
                borderTopWidth:0,
                height:55,
                // paddingVertical:5,
                zIndex:7,      
            },
            tabBarHideOnKeyboard:true,
            tabBarLabelStyle:{color:theme.fontColorContent, marginBottom:10}
          }}>
            <Tab.Screen name="Home" component={HomeStack} options={
              {headerShown:false,tabBarIcon: ({focused})  => <_Icon name='home' size={24} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:8}}/>}}
            />
              <Tab.Screen name='Create' component={CreateScreen} options={
              {tabBarLabelStyle:{display:'none'}, tabBarIconStyle: {paddingBottom:0}, tabBarIcon: ({focused})  => <_Icon_MaterialIcons name='plus-a' size={25} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:0}}/>}} 
            />
            <Tab.Screen name="Meeting" component={MeetingScreen} options={
              {tabBarIcon: ({focused}) => <Icon type='ionicon' name='people' size={24} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:5}}/>}} 
            />
          </Tab.Navigator>
    );
}