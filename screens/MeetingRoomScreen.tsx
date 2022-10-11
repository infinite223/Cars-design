import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { User } from '../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsTab from './../components/MeetingRoomTabs/CarsTab';
import ChatTab from './../components/MeetingRoomTabs/ChatTab';      
import MapViewDirections from 'react-native-maps-directions';
import { selectRoom } from './../slices/selectedRoomSlice';

const MeetingRoomScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)

    const Tab = createNativeStackNavigator();
    const route = useRoute<any>()
    const {people, name, place, date} = route.params;
    const selectedRoom = useSelector(selectRoom)

    console.log(place)

  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
    <ScrollView contentContainerStyle={{flex:1}}>
      <MapView
        style={{flex:.45}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={name}
          identifier='Origin'
          description={place.city}
        />
      </MapView>
      <View style={{flex:.4}}>
        <View style={style.textContainer}>
          <Text style={[style.date]}>{date}</Text>
          <Text style={[style.name, {color: theme.fontColor}]}>{name}</Text>
          <Text style={[style.place, {color: theme.fontColor}]}>{place.city}</Text>
        </View>
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
      flex:1,
      position:'relative'
    },
    textContainer: {
      paddingVertical:20,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    date: {
      color:'#1b3'
    },
    name:{ 
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing:1
    },
    place: {
      fontSize:13,
    }
  })