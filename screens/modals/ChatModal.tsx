import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '@rneui/themed';
import { User } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import ChatFunctionsConatiner from '../../components/ChatFunctionsConatiner';

const ChatModal:React.FC<{author:User, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({author, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const theme = useSelector(selectTheme)

    const complate = (nickname && description)? true:false

    const sendMessage = () => {

    }

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > 
        <View style={[style.mainContainer, {backgroundColor: theme.background}]}>          
           <View style={style.headerContainer}>
                <TouchableOpacity onPress={() => (navigation.navigate('Profile'), setModalVisible(false))}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:author.imageUri}}    
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:15, fontSize:18, color:theme.fontColor}}>{author.name}</Text>
           </View>
           <ScrollView style={{flex:1}}>

           </ScrollView>
           <ChatFunctionsConatiner author={author} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
      </Modal>
  )
}

export default ChatModal

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
  }
})