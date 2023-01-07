import { View, Text, Dimensions, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleTab from './../../components/MeetingRoomTabs/PeopleTab';
import ChatTab from './../../components/MeetingRoomTabs/ChatTab';      
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { selectedTabInRoom, selectRoom, selectFocuseOnSearch } from './../../slices/selectedRoomSlice';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { style } from './style';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { toDateTime } from '../../utils/toDateTime';
import { Icon } from '@rneui/themed';
import useAuth from '../../hooks/useAuth';
const { height: SCREEN_HEIGHT }:any = Dimensions.get('window')


const MeetingRoomScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)
    const tabInRoom  = useSelector(selectedTabInRoom)
    const translateY = useSharedValue(0)

    const Tab = createNativeStackNavigator();
    const route = useRoute<any>()
    const context = useSharedValue({y: 0})
    const focuseOnSearch = useSelector(selectFocuseOnSearch)
    const { user }:any = useAuth()
    const { name, place, date, id, createdBy} = route.params;

    const isMyMeeting = createdBy.uid === user.uid

    toDateTime(date.seconds)
    const gesture = Gesture.Pan()


    .onStart(()=> {
      context.value = { y: translateY.value }
    })
    
    .onUpdate((event)=> {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
      translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT / 2.7)
    })
    .onEnd(()=> {
      if(translateY.value>-SCREEN_HEIGHT/2.5){
        translateY.value =  withSpring( -SCREEN_HEIGHT/2.2, { damping: 50})
      }
      if(translateY.value<-SCREEN_HEIGHT/2 || focuseOnSearch){
        translateY.value =  withSpring( -SCREEN_HEIGHT, { damping: 50})
      }
    })

    const rRoomContentSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50], [20, 0], Extrapolate.CLAMP )
      const paddingTop = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50], [0, 25], Extrapolate.CLAMP )

      return {
        borderRadius,
        paddingTop,
        transform: [{translateY: translateY.value}]
      }
    })

    const rNameSpotSheetStyle = useAnimatedStyle(() => {
      const fontSize = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT - 150], [23, 10], Extrapolate.CLAMP  )

      return {
        fontSize
      }
    })

    useEffect(() => {
      translateY.value = withSpring(-SCREEN_HEIGHT/2.2, { damping: 50})
    }, [])

    useEffect(() => {
      if(tabInRoom.tab=="Chat" || focuseOnSearch){
        translateY.value = withSpring(-SCREEN_HEIGHT, { damping: 50})
      }

    }, [tabInRoom, focuseOnSearch])

  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background, position:'relative'}]}>
    <ScrollView contentContainerStyle={{flex:1}}>
      <MapView
        style={{flex:.6, zIndex:9}}
        region={{
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude,
          }}
          title={name}
          identifier='Origin'
          description={place.city}
        />
      </MapView>
      <View style={{position:'absolute', top:40, right:20, zIndex:20}}>
        <Menu>
            <MenuTrigger>
              <Text>
                <Icon                 
                  name='dots-three-vertical'
                  type='entypo'
                  size={26} 
                  color={'black'}
                />
              </Text>
            </MenuTrigger>
            <MenuOptions 
              customStyles={{optionsContainer: 
                {
                  paddingHorizontal:10,
                  paddingVertical:5,
                  borderRadius:10,
                  borderWidth:1, 
                  borderColor: theme.backgroundContent,
                  backgroundColor: theme.background
                }, optionText: {color:theme.fontColor}
              }}>
              <MenuOption onSelect={() => navigation.navigate('Report', {id, type:'meeting'})} >
                <Text style={{color: 'red'}}>
                  {/* {report[language as keyof typeof report]} */}
                  Report
                  </Text>
              </MenuOption>
              {isMyMeeting&&<MenuOption onSelect={() => alert(`Not called`)} disabled={true} text="Usuń meeting"/>}
              {/* <MenuOption onSelect={() => copyToClipboard(car.CarMake, car.model)}  text={capy[language as keyof typeof report]} />
              <MenuOption onSelect={() => hideProject(id)}  text={hide[language as keyof typeof report]} />
              <MenuOption onSelect={() => saveProject(id)}  text={save[language as keyof typeof report]} /> */}
            </MenuOptions>
          </Menu>
      </View>
     
      <GestureDetector gesture={gesture}>
        <Animated.View style={[style.mainContent, rRoomContentSheetStyle, {backgroundColor: theme.background}]}>
          <View style={[style.textContainer]}>
            <Text style={[style.date, {color: theme.fontColorContent}]}>{toDateTime(date.seconds).toDateString()}</Text>
            <Animated.Text style={[style.name, rNameSpotSheetStyle]}>{name}</Animated.Text>
            {/* <Text style={[style.place, {color: theme.fontColor}]}>{place.city}</Text> */}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1}}
          >
            <Tab.Navigator 
              screenOptions={{
                headerShown:false,
              }}>
              <Tab.Screen name="People" component={PeopleTab}/>
              <Tab.Screen name="Chat" component={ChatTab}/>
            </Tab.Navigator>
          </KeyboardAvoidingView>
        </Animated.View> 
      </GestureDetector>       
    </ScrollView>     
  </View>
  )
}

export default MeetingRoomScreen

