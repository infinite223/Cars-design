import { View, Text, Modal, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';


const CreateProjectScreen:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const theme = useSelector(selectTheme)

    const complate = (nickname && description)? true:false

    const createProject = () => {

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
        <View style={[style.mainContainer, {backgroundColor: theme.background}]}>          
            <Text style={[style.headerText, {color: theme.fontColor}]}>Create car project</Text>   
            <TextInput />
               
        </View>
      </Modal>
  )
}

export default CreateProjectScreen

const style = StyleSheet.create({
    mainContainer: {
        width:"100%", 
        height:130,  
        flex: 1,
        paddingHorizontal:15
    },
    headerText: {
        fontSize:20,
    }
})