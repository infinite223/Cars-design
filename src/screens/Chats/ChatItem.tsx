import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { Avatar, Icon } from '@rneui/base';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { selectLanguage } from '../../slices/languageSlice';
import { translations } from '../../utils/translations';
import useAuth, { db } from './../../hooks/useAuth';
import { setPrompt } from './../../slices/promptSlice';
import { unBlockPerson } from '../../firebase/chats/block';
import { Chat } from '../../utils/types';

export const ChatItem:React.FC<{item:Chat, deleteChat: (value:string) => void}> = ({item, deleteChat}) => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user } :any = useAuth()
    // const [messages, setMessages] = useState<any>([])
    const dispatch = useDispatch()
    
    const { menu: { blockText, unBlockText, reportText, deleteText }} = translations.screens.Chats 
    console.log(item)

    // useEffect(()=> {
    //     const messagesRef = collection(db, `chats/${item.id}/messages`)

    //     const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'))
    //     const unsubscribe = onSnapshot(messagesQuery, (snapchot) => {      
    //         setMessages(snapchot.docs.map((doc, i)=> {
    //             return doc.data()
    //         }))
    //       })

    //     return unsubscribe
    // }, [])

  return (
    <View style={style.renderItem}>
        {(item && item.data && item.data.from )&&
        <TouchableOpacity onPress={()=>navigation.navigate('Chat', item )} style={{alignItems:'center', flexDirection:'row', flex:1, opacity:item.block?.4:1}}>
            {/* <Avatar size={40} rounded source={{uri:!item.lastMessage.fromUid===user.uid?item.data.from.imageUri:item.data?.to?.imageUri}}/> */}
            <Avatar size={40} rounded source={{uri: item.data.from.imageUri}}/>

            <View style={style.textContainer}>
                <Text style={[{color: theme.fontColor}]}>{item.data.from.name}</Text>
                <Text style={[{color: theme.fontColorContent}]}>{item.lastMessage.message.length>30?item.lastMessage.message.substring(0, 30)+ '...':item.lastMessage.message}</Text>
            </View>
        </TouchableOpacity>}
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
            <MenuOption 
                onSelect={() => !item.block?dispatch(setPrompt({show:true, message:'Czy na pewno chcesz zablokować tego użytkownika?', type: 'block', id: item.id})):unBlockPerson(item.id)} 
                 text={!item.block?blockText[language as keyof typeof blockText]:unBlockText[language as keyof typeof unBlockText]+ " " + item.data.to.name}/>
            <MenuOption onSelect={() => navigation.navigate('Report', {id:item.data.to.id, type:'user'})} text={reportText[language as keyof typeof reportText] +" " + item.data.to.name}/>
        </MenuOptions>
        </Menu>
        </View>
    </View>
  )
}

