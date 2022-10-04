import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import ChatModal from './modals/ChatModal';
import { User } from '../utils/types';
import { Avatar } from '@rneui/base';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const authorUid = route.params;
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const [selectCHat, setSelectChat] = useState<User>()
    console.log(authorUid)

    const chats = [
      {
        id:1,
        author: {
          name:"Patryk",
          email:'dsadsa',
          imageUri: '',
          uid: ''
        }
      },{id:2}
    ]
  return (
    <View style={style.mainContainer}>
      {selectCHat&&<ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={selectCHat}/>}
      <FlatList 
        data={chats}
        renderItem={({item})=>{ 
          return <TouchableOpacity onPress={()=>(setChatModalVisible(true), setSelectChat(item.author))} style={style.renderItem}>
            <Avatar source={{uri:item.author?.imageUri}}/>
            <View style={style.textContainer}>
              <Text>{item.author?.name}</Text>
              <Text>last message</Text>
            </View>
          </TouchableOpacity>
        }}
      />
    </View>
  )
}

export default ChatsScreen

const style = StyleSheet.create({
  mainContainer: {
    flex:1
  },
  renderItem: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  textContainer: {
    
  }
})