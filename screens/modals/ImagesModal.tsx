import { View, Text, Modal, Alert, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { FlatList } from 'react-native-gesture-handler';


const ImagesModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void, photos:string[]}> = ({modalVisible, setModalVisible, photos}) => {
    
    const theme = useSelector(selectTheme)

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
          <FlatList
            data={photos}
            contentContainerStyle={{flex:1}}
            style={{width:300}}
            horizontal
            renderItem={({item})=> 
                <Image style={{width:300, height:200}} source={{uri: item}}/>
            }   
          />              
        </View>
      </Modal>
  )
}

export default ImagesModal

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
    headerText: {
        fontSize:20,
    }
})