import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed';
import { User } from '../../utils/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import ChatFunctionsConatiner from '../../components/ChatFunctionsConatiner';
import useAuth, { db } from '../../hooks/useAuth';
import { collection, collectionGroup, doc, onSnapshot, orderBy, query, setDoc, serverTimestamp } from 'firebase/firestore';
import { data } from '../../utils/data';
import { v4 as uuid } from 'uuid';
import { Icon } from '@rneui/base';

const ChatScreen = () => {
    const navigation = useNavigation<any>()
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const theme = useSelector(selectTheme)
    const { user }:any = useAuth()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<any>([])
    const [message, setMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const route = useRoute<any>()
    const to = route.params;

    console.log(to, 'xd')
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
          headerRight: () => 
              <Image style={{width:40, height:40, marginVertical:10}} source={require('../../assets/cars_projects_IconV2.png')}/>

        })  
      }, [theme])


    const complate = (nickname && description)? true:false

    const sendMessage = () => {
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
    }

    
    useLayoutEffect(()=> {
      const messagesRef = collection(db, "chats/" + `${to.id}` + "/messages")

      // const messagesRef = collectionGroup(db, `messages`)
       const messagesQuery = query(messagesRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(messagesQuery, (snapchot) => {      
            setMessages(snapchot.docs.map((doc, i)=> {
              console.log(doc.data())
                return {id: doc.id, data:doc.data()}
            }))      
        })
      
      return unsubscribe

    }, [])

    // console.log(messages)
    return (
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>          
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView style={{flex:1}} contentContainerStyle={{paddingTop:15}}>
            {messages.map(({id, data})=> 
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
            <ChatFunctionsConatiner message={message} setMessage={setMessage} sendMessage={sendMessage} author={user.uid} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
        </TouchableWithoutFeedback>
    </View>

  )
}

export default ChatScreen

const style = StyleSheet.create({
  mainContainer: {
    width:"100%", 
    height:130,  
    flex: 1,
    paddingHorizontal:15,
    paddingTop:15
  },
  headerContainer: {
    flexDirection:'row', 
    alignItems:'center',
    marginHorizontal:5
  },
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
  },
  reciever: {
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    alignSelf:'flex-end',
    borderRadius:15,
    marginBottom:20,
    maxWidth: '80%',
    position:'relative' 
  },
  sender: {
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    alignSelf:'flex-start',
    borderRadius:15,
    marginBottom:20,
    maxWidth: '80%',
    position:'relative' 
  },
  recieverText: {
    marginLeft:10
  },
  senderText:{

  }
})