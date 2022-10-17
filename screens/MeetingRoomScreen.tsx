import { View, Text, Dimensions, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleTab from './../components/MeetingRoomTabs/PeopleTab';
import ChatTab from './../components/MeetingRoomTabs/ChatTab';      
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { selectedTabInRoom, selectRoom } from './../slices/selectedRoomSlice';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT }:any = Dimensions.get('window')

const MeetingRoomScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)
    const tabInRoom  = useSelector(selectedTabInRoom)
    const translateY = useSharedValue(0)

    const Tab = createNativeStackNavigator();
    const route = useRoute<any>()
    const context = useSharedValue({y: 0})
    const {people, name, place, date} = route.params;
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
        translateY.value =  withSpring( -SCREEN_HEIGHT/2.5, { damping: 50})
      }
      if(translateY.value<-SCREEN_HEIGHT/2){
        translateY.value =  withSpring( -SCREEN_HEIGHT, { damping: 50})
      }
    })
    const selectedRoom = useSelector(selectRoom)

    const rRoomContentSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50], [15, 5], Extrapolate.CLAMP )
      return {
        borderRadius,
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
      translateY.value = withSpring(-SCREEN_HEIGHT/2.3, { damping: 50})
    }, [])

    console.log(tabInRoom)

    useEffect(() => {
      if(tabInRoom.tab=="Chat"){
        translateY.value = withSpring(-SCREEN_HEIGHT, { damping: 50})
      }

    }, [tabInRoom])
    

  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
    <ScrollView contentContainerStyle={{flex:1}}>
      <MapView
        style={{flex:.6, zIndex:9}}
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
      <GestureDetector gesture={gesture}>
        <Animated.View style={[style.mainContent, rRoomContentSheetStyle, {backgroundColor: theme.background}]}>
          <View style={[style.textContainer]}>
            <Text style={[style.date, {color: theme.fontColorContent}]}>{date}</Text>
            <Animated.Text style={[style.name, rNameSpotSheetStyle]}>{name}</Animated.Text>
            <Text style={[style.place, {color: theme.fontColor}]}>{place.city}</Text>
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

const style = StyleSheet.create({
    mainContainer: {
      flex:1,
      position:'relative'
    },
    mainContent: {
      zIndex:10,
      height: SCREEN_HEIGHT+50,
      width: "100%",
      position: 'absolute',
      top: SCREEN_HEIGHT,
      borderRadius: 15,
    },
    textContainer: {
      paddingTop:30,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    date: {
      fontSize:12,
      color:'#1b3',
    },
    name:{ 
      fontWeight: 'bold',
       letterSpacing:2,
      fontFamily: 'notoserif',
      color:'#1b3'
    },
    place: {
      fontSize:13,
    }
  })