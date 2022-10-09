import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { Feather, Ionicons } from 'react-native-vector-icons';
import MeetingRoomModal from '../screens/modals/MeetingRoomModal';
import { data, urlImageCar1 } from './../utils/data';
import { MeetingRoom } from '../utils/types';
import { useNavigation } from '@react-navigation/native';

export const HeaderTopProjects = () => {
    const navigation = useNavigation<any>()
    const meetingsRooms:MeetingRoom[] = [
        {name: "Kraakow spot", createdBy:data[0].author, place: "Kraków", people: [data[0].author], image: urlImageCar1},
        {name: "Opole spot", createdBy:data[0].author, place: "Opole", people: [data[0].author], image: 'https://jr-wheels.pl/zdjecia/2020/12/15/412/24/582fot1_01.jpg'},
        {name: "Opole spot", createdBy:data[0].author, place: "Opole", people: [data[0].author], image: 'https://jr-wheels.pl/zdjecia/2020/12/15/412/24/582fot1_01.jpg'},
        {name: "Opole spot", createdBy:data[0].author, place: "Opole", people: [data[0].author], image: 'https://jr-wheels.pl/zdjecia/2020/12/15/412/24/582fot1_01.jpg'}
    ]

    const theme = useSelector(selectTheme)

  return (
    <View style={style.mainContainer}>
      <View style={style.roomsContainer}>
        {meetingsRooms?
            <FlatList
                horizontal
                data={meetingsRooms}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={()=>navigation.navigate('MeetingRoom')} style={[style.meetingRoom]}>
                        <Image style={[style.imageRoom, {borderColor: theme.fontColorContent}]} blurRadius={10} source={{uri: item.image}}/>
                        <View style={style.textContainer}>
                            <Text style={[style.nameText, {color: theme.fontColor}]}>{item.name}</Text>
                            <Text style={[style.placeText, {color: '#5b9'}]}>{item.place}</Text>
                        </View>  
                        <View style={style.countPeople}>
                            <Text style={[{color: theme.fontColorContent, marginRight:3, fontSize:12}]}>{item.people.length}</Text>
                            <Ionicons name="md-people-outline" size={14} color={theme.fontColorContent}/>
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
        marginBottom:15,
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
        width: 140,
        height: 80,
        borderRadius:10,
        opacity: .5,
        backgroundColor: 'black'      
    },
    textContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, .2)',
        borderRadius:15,
        paddingHorizontal:8,
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