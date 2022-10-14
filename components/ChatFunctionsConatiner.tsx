import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@rneui/themed';
import { User } from '../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';


const ChatFunctionsConatiner:React.FC<{author?:User, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({setModalVisible}) => {
  const navigation = useNavigation<any>()
  const [nickname, setNickname] = useState('')
  const [description, setDescription] = useState('')
  const theme = useSelector(selectTheme)

  const complate = (nickname && description)? true:false

  const sendMessage = () => {

  }

  return (
    <View style={style.bottomNav}>
      <TouchableOpacity onPress={() => (navigation.navigate('Camera'), setModalVisible(false))}
        style={[style.cameraIcon, { backgroundColor:theme.backgroundContent}]}
      >
             <Ionicons name='camera-outline' size={24} color={theme.fontColor}/>
             </TouchableOpacity>
             <TextInput
              placeholderTextColor={theme.fontColorContent}
              placeholder='Type message'
              style={[style.inputMessage, {color:theme.fontColor, backgroundColor:theme.backgroundContent}]}/>
             <TouchableOpacity onPress={() => sendMessage()} style={{marginLeft:0}}>
                <Ionicons name='send-outline' size={24} color={theme.fontColor}/>
      </TouchableOpacity>
    </View>
  )
}

export default ChatFunctionsConatiner

const style = StyleSheet.create({
  bottomNav: {
    flexDirection:'row', 
    alignItems:'center', 
    marginVertical:15
  },
  cameraIcon: {
    borderColor:'gray', 
    borderRadius:20, 
    paddingVertical:7, 
    paddingHorizontal:10
  },
  inputMessage: {
    marginHorizontal:10,
    flex:1, 
    borderColor:'gray', 
    fontSize:18, 
    borderRadius:20, 
    paddingVertical:5, 
    paddingHorizontal:15
  }
})