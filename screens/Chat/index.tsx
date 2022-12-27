import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback, Image, StatusBar } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import ChatFunctionsConatiner from '../../components/ChatFunctionsConatiner';
import useAuth, { db } from '../../hooks/useAuth';
import { collection, doc, onSnapshot, orderBy, query, setDoc, serverTimestamp } from 'firebase/firestore';
import { style } from './style';
import { v4 as uuid } from 'uuid';
import { Icon } from '@rneui/base';
import { selectChats } from './../../slices/chatsSlice';
import { selectLanguage } from './../../slices/languageSlice';

const ChatScreen = () => {
    const navigation = useNavigation<any>()

    const theme = useSelector(selectTheme)
    const chats =  useSelector(selectChats)
    const { user }:any = useAuth()
    const [messages, setMessages] = useState<any>([])
    const [message, setMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const route = useRoute<any>()
    const to = route.params;
    const [newChat, setNewChat] = useState(to.new)
    const language = useSelector(selectLanguage)
  console.log(to)
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <View style={{flexDirection:'row', alignItems:'center'}}>
            <Avatar size={30} source={{uri:to.data.to.imageUri}}/>
            <Text style={{color: theme.fontColor, fontSize:19, marginLeft:15}}> {to.data.to.name}</Text>
           </View>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          ),
          // headerRight: () => 
          //     <Image style={{width:40, height:40, marginVertical:10}} source={require('../../assets/cars_projects_IconV2.png')}/>

        })  
      }, [theme])

    const sendMessage = () => {
      if(newChat){
        const chatRef = doc(db, `chats/${to.id}`);
        setDoc(chatRef, {
          blcok:false,
          persons: [user.uid, to.data.to.id],
          data: {
            from: {
              id:user.uid,
              name:user.name,
              imageUri:user.imageUri
            },
            to: {
              id:to.data.to.id,
              name:to.data.to.name,
              imageUri:to.data.to.imageUri
            }
          },
          id:to.id
        })
      }

      Keyboard.dismiss()
      const messageId = uuid();
      const messageRef = doc(db, `chats/${to.id}/messages/${messageId}`);

      setDoc(messageRef, {
        timestamp: serverTimestamp(),
        message: message, 
        name: user.name,
        imageUri: user.imageUri,
        email:user.email
      })

      setMessage('')
      setNewChat(false)
    }

    useLayoutEffect(()=> {
      const messagesRef = collection(db, "chats/" + `${to.id}` + "/messages")
      const messagesQuery = query(messagesRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(messagesQuery, (snapchot) => {  
            setMessages(snapchot.docs.map((doc, i)=> {
                return {id: doc.id, data:doc.data()}
            }))      
        })
      
      return unsubscribe

    }, [])

    return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>          
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView style={{flex:1}} contentContainerStyle={[{paddingTop:15, opacity:to.block?0.4:1}]}>
            {messages.map(({id, data}:{id:number, data:any})=> 
                data.email===user.email? (
                <View key={id} style={[style.reciever, {backgroundColor: theme.backgroundContent}]}>
                    <Avatar                     
                    size={28}
                    rounded
                    source={{uri:data.imageUri}}    
                    />
                    <Text style={[style.recieverText, {color: theme.fontColor}]}>{data.message}</Text>
                </View>
                ) : (
                <View key={id} style={[style.sender,  {backgroundColor: '#253'}]}>
                    <Avatar                     
                    size={28}
                    rounded
                    source={{uri:data.imageUri}}    
                    />
                    <Text style={[style.senderText, {color: theme.fontColor}]}>{data.message}</Text>
                </View>
                ))
            }
            </ScrollView>
            {to.block?<Text style={{color:'red', alignSelf:'center', paddingVertical:20, letterSpacing:2}}>
              {language==='en'?'This preson is blocked!':"Ta osoba jest zablokowana!"}
            </Text>:
            <ChatFunctionsConatiner message={message} setMessage={setMessage} sendMessage={sendMessage} author={user.uid} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            }
            </>
        </TouchableWithoutFeedback>
        <StatusBar backgroundColor={theme.background}/>
    </View>

  )
}

export default ChatScreen
