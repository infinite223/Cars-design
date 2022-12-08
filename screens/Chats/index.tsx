import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import ChatModal from './../modals/ChatModal';
import { User } from '../../utils/types';
import { Avatar } from '@rneui/base';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { Icon } from '@rneui/themed';
import { style } from './style'; 
import { collection, onSnapshot } from 'firebase/firestore';
import useAuth, { db } from '../../hooks/useAuth';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user }:any = useAuth()
    const authorUid = route.params;
    const [selectCHat, setSelectChat] = useState<User>()
    const [chats, setChats] = useState<any>([])

    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
              {language==="en"?"Chats":"Czaty"}
          </Text>,
         headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
            <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
          </TouchableOpacity> 
      )})
    }, [theme, language])

    useLayoutEffect(()=> {
      const chatsRef = collection(db, "chats/")

      const unsubscribe = onSnapshot(chatsRef, (snapchot) => {      
            setChats(snapchot.docs.map((doc, i)=> {
              console.log(doc.data())
                return {id: doc.id, data:doc.data()}
            }))      
        })
      
      return unsubscribe

    }, [])


   
  return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
      <FlatList 
        data={chats}
        renderItem={({item})=>{ 
          return <TouchableOpacity onPress={()=>navigation.navigate('Chat', item )} style={style.renderItem}>
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