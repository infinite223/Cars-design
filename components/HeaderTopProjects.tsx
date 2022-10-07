import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { Feather } from 'react-native-vector-icons';
import MeetingRoomModal from '../screens/modals/MeetingRoomModal';
import { data, urlImageCar1 } from './../utils/data';
import { MeetingRoom } from '../utils/types';

export const HeaderTopProjects = () => {
    const meetingsRooms:MeetingRoom[] = [
        {name: "Kraakow spot", createdBy:data[0].author, place: "Kraków", people: [data[0].author], image: urlImageCar1}
    ]

    const theme = useSelector(selectTheme)
    const [meetingRoomModalVisible, setMeetingRoomModalVisible] = useState(false)

  return (
    <View style={style.mainContainer}>
      <MeetingRoomModal modalVisible={meetingRoomModalVisible} setModalVisible={setMeetingRoomModalVisible}/>
      <Text style={[style.headerText, {color:theme.fontColorContent}]}>
        Spots
      </Text>
      <View style={style.roomsContainer}>
        <TouchableOpacity style={[style.createButton, {borderColor: theme.fontColorContent}]}>
            <Feather name="plus" color={theme.fontColorContent} size={20}/>
        </TouchableOpacity>
        {meetingsRooms?
            <FlatList
                data={meetingsRooms}
                renderItem={({item}) => {
                    return <TouchableOpacity style={style.meetingRoom}>
                        <Image style={[style.imageRoom, {borderColor: theme.fontColorContent}]} blurRadius={10} source={{uri: item.image}}/>
                        <Text style={[style.nameText, {color: theme.fontColor}]}>{item.name} {item.place}</Text>
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
        // alignItems:'center',

        marginHorizontal:10
    },
    logo: {
        width:50,
        height:50,
        borderRadius:10
    },
    headerText: {
        marginLeft:4,
        fontSize:12       
    },
    createButton: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:18,
        borderWidth:1,
        padding:5,
        width:45,
        height:45,
    },
    roomsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginTop:10,
        marginBottom:15
    },
    warningText: {
        marginLeft:12,
        maxWidth:250
    },
    meetingRoom: {
        marginHorizontal:10,
        borderRadius:25,
        position:'relative'
    },
    imageRoom: {
        width: 100,
        height: 50,
        borderRadius:10,
        opacity: .5
    },
    nameText: {
        position: 'absolute',
        margin:5,
        fontSize:12
    }
})