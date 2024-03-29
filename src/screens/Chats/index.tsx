import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { AlertProps, Chat, User } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { Icon } from '@rneui/themed';
import { style } from './style'; 
import { deleteDoc, doc } from 'firebase/firestore';
import useAuth, { db } from '../../hooks/useAuth';
import AlertModal from '../modals/AlertModal';
import { translations } from './../../utils/translations';
import { selectChats } from './../../slices/chatsSlice';
import { ChatItem } from './ChatItem';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const theme = useSelector(selectTheme)
    const chats:Chat[] = useSelector(selectChats)
    const language = useSelector(selectLanguage)

    const [alertModal, setAlertModal] = useState<AlertProps>({message:'', show:false, type:''})

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackVisible:false,
         headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
              {language==="en"?"Chats":"Czaty"}
          </Text>,
         headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10, paddingRight: 15}}>
            <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
          </TouchableOpacity> 
      )})
    }, [theme, language])

    const deleteChat = async (chatId:string) => {
      await deleteDoc(doc(db, "chats", chatId)).catch(()=> {
        setAlertModal({show:true, type:'ERROR', message:'Somthing want wrong!'})
      })
    }

    
   
  return ( 
    <View style={[style.mainContainer, {backgroundColor: theme.background}]}>
      {alertModal.show&&<AlertModal resetError={setAlertModal} message={alertModal.message} type={alertModal.type} show={alertModal.show}/>}
      <FlatList 
        data={chats}
        renderItem={({item})=>{ 
          return <ChatItem item={item} deleteChat={deleteChat}/>
        }}
      />
    </View>
  )
}

export default ChatsScreen