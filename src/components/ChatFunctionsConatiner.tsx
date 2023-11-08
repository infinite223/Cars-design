import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { User } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'

const ChatFunctionsConatiner:React.FC<{message:string, setMessage: (value: string)=> void, sendMessage:() => void, author?:User, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({message, setMessage, sendMessage,setModalVisible}) => {
  const theme = useSelector(selectTheme)

  return (
    <View style={style.bottomNav}>
      <View style={[style.container, {backgroundColor: theme.backgroundContent}]}>
        <TextInput
          placeholderTextColor={theme.fontColorContent}
          placeholder='Napisz wiadomość'
          value={message}
          onChangeText={setMessage}
          style={[style.inputMessage, { color: theme.fontColor, backgroundColor:theme.backgroundContent}]}
        />
        <TouchableOpacity onPress={sendMessage} style={{paddingHorizontal:8}}>
          <_Icon_Ionicons name={'send-outline'} size={20} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatFunctionsConatiner

const style = StyleSheet.create({
  container: {
    borderRadius:50,
    paddingHorizontal:10,
    paddingVertical:8,
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'s'
  },
  bottomNav: {
    flexDirection:'row', 
    alignItems:'center', 
    marginVertical:15
  },
  cameraIcon: {
    borderWidth:1,
    borderRadius:20, 
    paddingVertical:7, 
    paddingHorizontal:9
  },
  inputMessage: {
    marginHorizontal:10,
    flex:1,
    fontSize:15,
  }
})