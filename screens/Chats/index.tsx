import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { AlertProps, User } from '../../utils/types';
import { Avatar } from '@rneui/base';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { Icon } from '@rneui/themed';
import { style } from './style'; 
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import useAuth, { db } from '../../hooks/useAuth';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AlertModal from '../modals/AlertModal';
import { translations } from './../../utils/translations';
import { selectChats } from './../../slices/chatsSlice';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const theme = useSelector(selectTheme)
    const chats = useSelector(selectChats)
    const language = useSelector(selectLanguage)
    const { menu: { blockText, reportText, deleteText }} = translations.screens.Chats 
    const { user }:any = useAuth()
    const authorUid = route.params;
    const [selectChat, setSelectChat] = useState<User>()
    // const [chats, setChats] = useState<any>()
    const [alertModal, setAlertModal] = useState<AlertProps>({message:'', show:false, type:''})

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
          return <View style={style.renderItem}>
            <TouchableOpacity onPress={()=>navigation.navigate('Chat', item )} style={{alignItems:'center', flexDirection:'row', flex:1}}>
              <Avatar size={34} rounded source={{uri:item.data.to.imageUri}}/>
              <View style={style.textContainer}>
                <Text style={[{color: theme.fontColor}]}>{item.data.to.name}</Text>
                <Text style={[{color: theme.fontColorContent}]}>{item.lastMessage?.time}</Text>
              </View>
            </TouchableOpacity>

          <View>
            <Menu>
              <MenuTrigger style={{paddingLeft:20, paddingVertical:5, marginTop:10}}>
                <Text>
                  <Icon                 
                    name='dots-three-vertical'
                    type='entypo'
                    size={16} 
                    color={theme.fontColor}
                  />
                </Text>
              </MenuTrigger>
              <MenuOptions 
                customStyles={{optionsContainer: 
                  {
                    paddingHorizontal:10,
                    paddingVertical:5,
                    borderRadius:10,
                    borderWidth:1, 
                    borderColor: theme.backgroundContent,
                    backgroundColor: theme.background
                  }, optionText: {color:theme.fontColor}
                }}>
                <MenuOption onSelect={() => deleteChat(item.id)} >
                  <Text style={{color: 'red'}}>{deleteText[language as keyof typeof deleteText]}</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert(`...`)}  text={blockText[language as keyof typeof blockText]+" " + item.data.to.name}/>
                <MenuOption onSelect={() => navigation.navigate('Report', {id:item.data.to.id, type:'user'})} text={reportText[language as keyof typeof reportText] +" " + item.data.to.name}/>
              </MenuOptions>
            </Menu>
            </View>
          </View>
        }}
      />
    </View>
  )
}

export default ChatsScreen