import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@rneui/themed';
import { User } from '../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { MeetingRoom } from '../utils/types';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsTab from './../components/MeetingRoomTabs/CarsTab';
import ChatTab from './../components/MeetingRoomTabs/ChatTab';
import MapViewDirections from 'react-native-maps-directions';

const MeetingRoomScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)

    const Tab = createNativeStackNavigator();
    const route = useRoute<any>()
    const {people, name, place} = route.params;

  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
    <View style={style.textContainer}>
      <Text style={style.name}>{name}</Text>
      <Text style={style.place}>{place.city}</Text>
    </View>
    <ScrollView contentContainerStyle={{flex:1}}>
      <MapView
        style={{flex:.6}}
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
          title="Spot"
          identifier='Origin'
          description='dsads'
        />
        {people.map((person:User)=> {
          console.log(person, "xd")
          return <Marker coordinate={{
            latitude: person?.place?.latitude?person.place?.latitude:0,
            longitude: person?.place?.longitude?person.place?.longitude:0
          }}
          
          title="Spot"
          identifier='Origin'
          description='dsads'/>
        })}
      </MapView>
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
      flex:1,
      position:'relative'
    },
    textContainer: {
      position:'absolute',
      zIndex:1,
      top:30,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    name:{ 
      fontSize: 18,
      fontWeight: 'bold',
      color:'black',
      letterSpacing:2
    },
    place: {
      fontSize:13,
      color: '#1b3'
    }
  })