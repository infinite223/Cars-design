import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { User } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { Icon } from '@rneui/base';

const ChatFunctionsConatiner:React.FC<{message:string, setMessage: (value: string)=> void, sendMessage:() => void, author?:User, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({message, setMessage, sendMessage,setModalVisible}) => {
  const navigation = useNavigation<any>()
  const [nickname, setNickname] = useState('')
  const [description, setDescription] = useState('')
  const theme = useSelector(selectTheme)

  return (
    <View style={style.bottomNav}>
      <TextInput
        placeholderTextColor={theme.fontColorContent}
        placeholder='Type message'
        value={message}
        onChangeText={setMessage}
        style={[style.inputMessage, {color:theme.fontColor, borderColor:theme.backgroundContent}]}
      />
      <TouchableOpacity onPress={sendMessage} style={{marginLeft:8}}>
        <Icon type="ionicon" name="send-outline" size={20} color={theme.fontColor}/>
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
    borderWidth:1,
    borderRadius:20, 
    paddingVertical:7, 
    paddingHorizontal:9
  },
  inputMessage: {
    marginHorizontal:10,
    flex:1, 
    borderWidth:1,
    fontSize:15, 
    borderRadius:20, 
    paddingVertical:3, 
    paddingHorizontal:12
  }
})