import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@rneui/themed';
import { User } from '../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { MeetingRoom } from '../utils/types';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsTab from './../components/MeetingRoomTabs/CarsTab';
import ChatTab from './../components/MeetingRoomTabs/ChatTab';

const MeetingRoomScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)

    const Tab = createNativeStackNavigator();
  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
    <ScrollView contentContainerStyle={{flex:1}}>
      <MapView
        style={{flex:.6}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={{flex:.4}}>
      <Tab.Navigator  
        screenOptions={{
          headerShown:false 
        }}>
        <Tab.Screen name="Cars" component={CarsTab}/>
        <Tab.Screen name="Chat" component={ChatTab}/>
      </Tab.Navigator>
      </View>        
    </ScrollView>     
  </View>
  )
}

export default MeetingRoomScreen

const style = StyleSheet.create({
    mainContainer: {
      flex:1
    }
  })