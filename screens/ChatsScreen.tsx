import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import ChatModal from './modals/ChatModal';
import { User } from '../utils/types';
import { Avatar } from '@rneui/base';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { selectLanguage } from './../slices/languageSlice';
import { Icon } from '@rneui/themed';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const authorUid = route.params;
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const [selectCHat, setSelectChat] = useState<User>()
    console.log(authorUid)

    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>
              {language==="en"?"Chats":"Czaty"}
          </Text>,
         headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon type="materialicon" name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
          </TouchableOpacity>
      )})
    }, [theme, language])

    const chats = [
      {
        id:1,
        author: {
          name:"Patryk",
          email:'dsadsa',
          imageUri: 'https://th.bing.com/th/id/OIP.8klPFuZfuYqlbcurY74L7AHaHZ?pid=ImgDet&rs=1',
          uid: ''
        },
        lastMessage:{
          time:"23:23"
        }
      },
      {
        id:2,
        author: {
          name:"Zbyniu",
          email:'dsadsa',
          imageUri: 'https://th.bing.com/th/id/OIP.8klPFuZfuYqlbcurY74L7AHaHZ?pid=ImgDet&rs=1',
          uid: ''
        },
        lastMessage:{
          time:"13:03"
        }}
    ]
  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
      {selectCHat&&<ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={selectCHat}/>}
      <FlatList 
        data={chats}
        renderItem={({item})=>{ 
          return <TouchableOpacity onPress={()=>(setChatModalVisible(true), setSelectChat(item.author))} style={style.renderItem}>
            <Avatar size={34} rounded source={{uri:item.author?.imageUri}}/>
            <View style={style.textContainer}>
              <Text style={[{color: theme.fontColor}]}>{item.author?.name}</Text>
              <Text style={[{color: theme.fontColorContent}]}>last message {"  "} {item.lastMessage?.time}</Text>
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
    paddingHorizontal:5,
    marginHorizontal:15,
    paddingVertical:8,
    flex:1,
    alignItems: 'center',    
    borderRadius:10,
   
  },
  textContainer: {
    marginLeft:15
  }
})