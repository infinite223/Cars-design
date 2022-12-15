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

export const HeaderTopProjects = () => {
    const navigation = useNavigation<any>()
    const { user } = useAuth()
    const meetingsRooms:MeetingRoom[] = [
        {name: "Kraakow spot", date:"12.12.2022", createdBy:user, place: {city: "Krakow", latitude:123, longitude:132}, 
        people: [{name:"Adam", uid:'dsad', place:{city: "Opole", latitude:123, longitude:112}, carProjects: {id:'2', authorUid:'c', car:{carMake:'Bmw', model:'M4', imageUri:urlImageCar1}}, imageUri: user.imageUri}], 
        image: urlImageCar1},
    ]

    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

  return (
    <View style={style.mainContainer}>
      <View style={style.roomsContainer}>
        {meetingsRooms?
            <FlatList
                ItemSeparatorComponent={()=><View style={{height:10}}/>}
                data={meetingsRooms}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={()=> (navigation.navigate('MeetingRoom', item), dispatch(setSelectedRoom(item)))} style={[style.meetingRoom]}>
                        <Image style={[style.imageRoom, {borderColor: theme.fontColorContent}]} blurRadius={0} source={{uri: item.image}}/>
                        <View style={style.textContainer}>
                            <Text style={[style.nameText, {color: 'white'}]}>{item.name}</Text>
                            <Text style={[style.placeText, {color: '#5b9'}]}>{item.place.city}</Text>
                        </View>  
                        <View style={style.countPeople}>
                            <Text style={[{color: theme.fontColor, marginRight:5, fontSize:12}]}>{item.people.length}</Text>
                            <Icon type='ionicon' name="md-people-outline" size={14} color={theme.fontColor}/>
                        </View>                                          
                    </TouchableOpacity>
                }}
            />:
            <Text style={[style.warningText]}>
                Now there are no meetings rooms created
            </Text>
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    mainContainer : {
         justifyContent:'center'
    },
    logo: {
        width:50,
        height:50,
        borderRadius:10
    },
    roomsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginTop:3,
        paddingHorizontal:5
    },
    warningText: {
        marginLeft:12,
        maxWidth:250
    },
    meetingRoom: {
        marginHorizontal:5,
        position:'relative',
        flexDirection:'row',
        borderRadius:10
    },
    imageRoom: {
        width: 360,
        height: 250,
        borderRadius:10,
        opacity: .9,
        backgroundColor: 'black'      
    },
    textContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, .5)',
        borderRadius:10,
        justifyContent:'center',
        paddingHorizontal:10,
        paddingVertical:2,
        margin:5,
    },
    nameText: {
        fontSize:12
    },
    placeText: {
        fontSize:10
    },
    countPeople: {
        position: 'absolute',
        bottom:2,
        right:2,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5
    }
})