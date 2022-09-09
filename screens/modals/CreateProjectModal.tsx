import { View, Text, Modal, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'


const CreateProjectScreen:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')

    const complate = (nickname && description)? true:false

    const createProject = () => {

    }

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
            
            <TouchableOpacity disabled={!complate} onPress={() => createProject() } style={{marginVertical:20, paddingHorizontal:20, paddingVertical:5}}>
                <LinearGradient         
                    colors={["#339", "#935"]}
                    start={[0.7, 0.2]}
                    style={{paddingHorizontal:30, paddingVertical:8, borderRadius:20}}
                >   
                    <Text style={{fontSize:22, color:"white", fontWeight:'bold', letterSpacing:2}}>
                        Create project
                    </Text>
                </LinearGradient> 
            </TouchableOpacity>
        </View>
      </Modal>
  )
}

export default CreateProjectScreen