import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { Feather } from 'react-native-vector-icons';

export const HeaderTopProjects = () => {
    const meetingsRooms = null

    const theme = useSelector(selectTheme)

  return (
    <View style={style.mainContainer}>
      {/* <Image style={style.logo} source={require('./../assets/cars_projects_IconV2.png')}/> */}
      <Text style={[style.headerText, {color:theme.fontColorContent}]}>
        Meetings rooms
      </Text>
      <View style={style.roomsContainer}>
        <TouchableOpacity style={[style.createButton, {borderColor: theme.fontColorContent}]}>
            {/* <Text style={{color: theme.fontColorContent, fontSize:24}}>+</Text> */}
            <Feather name="plus" color={theme.fontColorContent} size={20}/>
        </TouchableOpacity>
        {meetingsRooms?
            <FlatList
                data={meetingsRooms}
                renderItem={()=> {
                    return <View></View>
                }}
            />:
            <Text style={[style.warningText, {color: theme.fontColorContent}]}>
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
        borderRadius:20,
        borderWidth:1,
        padding:5,
        width:50,
        height:50,
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
    }
})