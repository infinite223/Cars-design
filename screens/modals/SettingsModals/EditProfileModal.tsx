import { View, Text, Modal, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'


const EditProfileScreen:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const { user, logout }:any = useAuth()
    const navigation = useNavigation()

    const complate = (nickname && description)? true:false

    const updateProfile = async () => {
        await setDoc(doc(db, "users", user.uid), {
            user:user.uid,
            niclanme:nickname,
            description:description,
            timestamp:serverTimestamp()
            // a:"b"
        })
        // const dbRef = collection(db, "users");
        // // console.log(dbRef)
        // await addDoc(dbRef, {xd:"s"})
        .then((a)=> console.log(a))
        .catch((e) => console.log(e))
     }

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
            justifyContent: 'space-evenly',
            alignItems: "center",
            backgroundColor:'white'
        }}>
            

            <View style={{alignItems:'center'}}>
                <Text style={{ margin:20, fontFamily:'monospace', fontSize:30, fontWeight:'bold'}}>Cars projects</Text>
                <Text style={{fontSize:25}}>Your profile</Text>
                <TextInput style={{fontSize:20, marginTop:15, textAlign:'center'}} placeholder='Nickname' onChangeText={setNickname}/>
                <TextInput style={{fontSize:20, marginTop:5, maxWidth:250, textAlign:'center'}} onChangeText={setDescription} multiline placeholder='Some information abaut you'/>
            </View>
            
            <TouchableOpacity disabled={!complate} onPress={updateProfile} style={{marginVertical:20, paddingHorizontal:20, paddingVertical:5}}>
                <LinearGradient         
                    colors={["#339", "#935"]}
                    start={[0.7, 0.2]}
                    style={{paddingHorizontal:30, paddingVertical:8, borderRadius:20}}
                >   
                    <Text style={{fontSize:22, color:"white", fontWeight:'bold', letterSpacing:2}}>
                        Update profile
                    </Text>
                </LinearGradient> 
            </TouchableOpacity>
        </View>
      </Modal>
  )
}

export default EditProfileScreen