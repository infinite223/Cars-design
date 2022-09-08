import { View, Text, Modal, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'


const CreateProjectScreen:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
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
            justifyContent: 'space-between',
            alignItems: "center",
            backgroundColor:'white'
        }}>
            <Text>Create car projecct</Text>
            
            <TouchableOpacity onPress={() => createProject() } style={{marginVertical:20, paddingHorizontal:20, paddingVertical:5}}>
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