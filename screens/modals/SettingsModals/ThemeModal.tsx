import { View, Text, Modal, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { setTheme } from './../../../slices/themeSlice'


const ThemeModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
            width:"70%", 
            position:'absolute',
            left:55,
            top:200,
            height:250,  
            flex: .5,
            justifyContent: 'space-between',
            alignItems: "center",
            backgroundColor:theme.background,
            paddingHorizontal:10,
            paddingVertical:5,
            borderColor:theme.backgroundContent,
            borderWidth:1,
            borderRadius:10,
        }}>
            <Text style={{color: theme.fontColor, fontSize:22, marginVertical:20}}>Select theme</Text>
            <View style={{flex:1, width:'100%', flexDirection:'row', height:"100%", alignItems:'center', justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>dispatch(setTheme({
                        background:'white',
                        backgroundContent:'#aaa',
                        fontColor:'black',
                        fontColorContent: '#333'
                    }
                    ))} 
                    style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{borderColor:theme.backgroundContent, borderWidth:1,backgroundColor:'white', width:70, height:70, borderRadius:20}}></View>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingVertical:10}}>White</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>dispatch(setTheme({
                        background:'black', 
                        backgroundContent:'#333',
                        fontColor:'white',
                        fontColorContent: '#aaa'
                       }))}
                    style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{borderColor:theme.backgroundContent, borderWidth:1, backgroundColor:'black', width:70, height:70, borderRadius:20}}></View>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingVertical:10}}>Black</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
  )
}

export default ThemeModal