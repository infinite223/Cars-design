import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@rneui/themed';
import { User } from '../../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';

const MapModal:React.FC<{author:User, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({author, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')

    const complate = (nickname && description)? true:false

    const sendMessage = () => {

    }

    console.log(author.uid)

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      > 
        <View style={{
            width:"100%", 
            height:130,  
            flex: 1,
            paddingHorizontal:15,
            backgroundColor:'white'
        }}>          
           <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={() => (navigation.navigate('Profile'), setModalVisible(false))}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:author.imageUri}}    
                    />
                </TouchableOpacity>
                <Text style={{marginLeft:8, fontSize:18}}>{author.name}</Text>
           </View>
           <ScrollView style={{flex:1}}>

           </ScrollView>
           <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <TouchableOpacity onPress={() => (navigation.navigate('Camera'), setModalVisible(false))}>
                <Ionicons name='camera-outline' size={24} />
             </TouchableOpacity>
             <TextInput placeholder='Type message' style={{marginHorizontal:10, color:'black', flex:1, borderColor:'gray', fontSize:18, backgroundColor:'#eee', borderRadius:20, paddingVertical:5, paddingHorizontal:15}}/>
             <TouchableOpacity onPress={() => sendMessage()} style={{marginLeft:0}}>
                <Ionicons name='send-outline' size={24} />
             </TouchableOpacity>
           </View>
        </View>
      </Modal>
  )
}

export default MapModal