import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateScreen from '../screens/Create/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import _Icon_Entypo  from 'react-native-vector-icons/Entypo'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'
import _Icon_MaterialIcons  from 'react-native-vector-icons/Fontisto'
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'
import _Icon_Feather from 'react-native-vector-icons/Feather'
import { Icon } from '@rneui/themed';
import MeetingScreen from '../screens/Meeting';
import { TouchableOpacity, View } from 'react-native';
import { setNavigation } from '../slices/navigationSlice';
import HomeScreen from './../screens/Home/index';
import { ProblemsScreen } from '../screens/Problems';

export const TabsNavigator = () => {

    const Tab = createBottomTabNavigator()
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

  return (
        <Tab.Navigator screenOptions={{
            headerShadowVisible: false,
            tabBarShowLabel:false,
            headerStyle:{
              backgroundColor:theme.background
            },
            tabBarVisibilityAnimationConfig: {hide: {animation: 'spring', config: {delay: 3}}, show: {animation: 'spring'}},
            tabBarStyle: {
                backgroundColor:theme.background,
                borderTopWidth:0,
                height:55,
                zIndex:7,      
            },
            tabBarHideOnKeyboard:true,
            tabBarLabelStyle:{color:theme.fontColorContent, marginBottom:10}
          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={
              { tabBarLabelStyle:{display:'none'}, tabBarIcon: ({focused})  => <_Icon_Entypo name='home' size={24} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:8}}/>}}
            />
              <Tab.Screen name='Problems' component={ProblemsScreen} options={
              {tabBarLabelStyle:{display:'none'}, tabBarIconStyle: {paddingBottom:0}, tabBarIcon: ({focused})  => 
                <_Icon_Feather name='refresh-cw' size={21} color={focused?theme.fontColor:theme.fontColorContent}/>
            }} 
            />
            <Tab.Screen name='Create' component={CreateScreen} options={
              {
                // headerShown: false, tabBarLabelStyle:{display:'none'},
               tabBarIconStyle: {paddingBottom:0}, tabBarIcon: ({focused})  => <_Icon_MaterialIcons name='plus-a' size={25} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:0}}/>}} 
            />
            
            <Tab.Screen name="Meeting" component={MeetingScreen} options={
              {tabBarIcon: ({focused}) => <Icon type='ionicon' name='people' size={24} color={focused?theme.fontColor:theme.fontColorContent} style={{paddingTop:5}}/>}} 
            />
            <Tab.Screen name='Menu' component={()=><View/>} listeners={{
              tabPress: e => {
                  e.preventDefault();
                },
              }} 
              options={
              {tabBarLabelStyle:{display:'none'}, tabBarIconStyle: {paddingBottom:0}, tabBarIcon: ({focused})  => 
              <TouchableOpacity onPress={() => dispatch(setNavigation(true))}>
                <_Icon_Ionicons name={'menu-outline'} size={30} color={focused?theme.fontColor:theme.fontColorContent} style={{ marginRight: 0 }}/>
              </TouchableOpacity>
              }}      
            />
          </Tab.Navigator>
    );
}