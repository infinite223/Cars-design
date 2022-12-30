import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { urlImageCar1 } from './../utils/data';
import { MeetingRoom } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import { setSelectedRoom } from '../slices/selectedRoomSlice';
import { Icon } from '@rneui/base';
import useAuth from '../hooks/useAuth';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const widthScreen = Dimensions.get('screen').width

export const HeaderTopProjects = () => {
    const navigation = useNavigation<any>()
    const { user }:any = useAuth()
    const meetingsRooms:MeetingRoom[] = [
        {name: "Kraakow spot", date:"12.12.2022", createdBy:user, place: {city: "Krakow", latitude:37.7, longitude:-122.4}, 
        people: [{name:"Adam", uid:'dsad', place:{city: "Opole", latitude:51, longitude:18}, carProjects: {id:'2', authorUid:'c', car:{carMake:'Bmw', model:'M4', imageUri:urlImageCar1}}, imageUri: user.imageUri}], 
        image: urlImageCar1},
    ]

    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

  return (
      <View style={style.roomsContainer}>
        {meetingsRooms?
            <FlatList
                ItemSeparatorComponent={()=><View style={{height:10}}/>}
                contentContainerStyle={{ width:widthScreen}}
                data={meetingsRooms}
                renderItem={({item}) => {
                    return (                        
                    <TouchableOpacity activeOpacity={.5} onPress={()=> (navigation.navigate('MeetingRoom', item), dispatch(setSelectedRoom(item)))}>
                        <View style={style.dateContainer}>
                            <Icon type='entypo' name="clock" size={14} color={theme.fontColor}/>
                            <Text style={{color:theme.fontColor, marginLeft:7}}>za 2 dni...</Text>
                        </View>
                        <View style={[style.meetingRoom, {backgroundColor: theme.backgroundContent}]}>
                            <MapView          
                                scrollEnabled={false}          
                                style={style.miniMap}
                                initialRegion={{
                                    latitude: item.place.latitude,
                                    longitude: item.place.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                
                            />
                            {/* <Image style={[style.imageRoom, {borderColor: theme.fontColorContent}]} blurRadius={0} source={{uri: item.image}}/> */}
                            <View style={{flex:1, marginHorizontal: 10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>                
                                <View style={style.textContainer}>
                                    <Text style={[style.nameText, {color: 'white'}]}>{item.name}</Text>
                                    <Text style={[style.placeText, {color: '#5f9'}]}>{item.place.city}</Text>
                                </View>  
                                <View style={style.countPeople}>
                                    <Text style={[{color: theme.fontColor, marginRight:8, fontSize:15, fontWeight:'bold'}]}>{item.people.length}</Text>
                                    <Icon type='ionicon' name="people-outline" size={18} color={theme.fontColor}/>
                                </View>        
                            </View>                                 
                            <Icon style={{alignSelf:'center', marginRight:10}} type='materialicon' name="arrow-forward-ios" size={14} color={theme.fontColor}/> 
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />:
            <Text style={[style.warningText]}>
                Now there are no meetings rooms created
            </Text>
        }
      </View>
  )
}

const style = StyleSheet.create({
    roomsContainer: {
        alignSelf:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:3,
        // paddingHorizontal:5,
        width:'100%',
    },
    warningText: {
        marginLeft:12,
        maxWidth:250
    },
    meetingRoom: {
        marginHorizontal:15,
        flexDirection:'row',
        // backgroundColor:'#333',
        borderRadius:10,
        alignItems:'center',
        position:'relative',
        overflow: 'hidden',  
    },
    imageRoom: {
        width: 110,
        height: 60,
        borderBottomLeftRadius:5,
        borderTopLeftRadius:5,
        opacity: .9,
        backgroundColor: 'black',
    },
    dateContainer: {
        position:'relative',
        zIndex:10,
        backgroundColor:'#273',
        marginHorizontal:30,
        // borderTopRadius:20,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:5,
        maxWidth:120
    },
    textContainer: {
        paddingVertical:2,
        marginHorizontal:5,
        marginVertical:5
    },
    nameText: {
        fontSize:12
    },
    placeText: {
        fontSize:14,
        letterSpacing:1
    },
    countPeople: {
        // position: 'absolute',
        // bottom:2,
        // right:2,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:'gray',
        height:35,
        alignSelf:'center',
    },
    miniMap: {
        width: 110,
        height: 60,
        opacity:.7,
        borderRadius:0,
        position:'relative',
    }
})