import { FlatList, Modal, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Component } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { TextInput } from 'react-native-gesture-handler';

const carComponents:string[] = ["turbo", 'intercooler', 'engine', 'exhaust', 'transmission']

interface AddComponentModalProps {
    modalVisible:boolean, 
    setModalVisible: (value:boolean) => void,
    setComponent: (value:Component) => void
}

const AddComponentModal:React.FC<AddComponentModalProps> = ({ modalVisible, setModalVisible, setComponent}) => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)
    const [selectedComponent, setSelectedComponent] = useState(0)

    const [nameComponent, setNameComponent] = useState('')
    const [descriptionComponent, setDescriptionComponent] = useState('')


    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
          <View style={[style.modalContainer, {borderColor:theme.backgroundContent,  backgroundColor:theme.background}]}>
            <Text style={[{color: theme.fontColor}]}>
                Choose component
            </Text>
            <FlatList
                horizontal
                ItemSeparatorComponent={()=><View style={{width:10}}/>}
                data={carComponents}
                renderItem={({item, index})=> (
                    <TouchableOpacity onPress={()=>setSelectedComponent(index)}>
                        <Image
                            style={style.imageCarComponent}
                            source={require(
                                item==='turbo'?'../../assets/componentsIcons/turbo_white':
                                item==='intercooler'?'../../assets/componentsIcons/intercooler_white':
                                item==='engine'?'../../assets/componentsIcons/engine_white':
                                item==='exhaust'?'../../assets/componentsIcons/exhaust_white':
                                '../../assets/componentsIcons/transmission_white'
                            )}
                        />
                    </TouchableOpacity>
                )}
            />

            <TextInput onChangeText={setNameComponent} placeholder='name component, (np. K03, N54, 2JZ)' placeholderTextColor={theme.fontColorContent}/>
            <TextInput onChangeText={setDescriptionComponent} placeholder='description' placeholderTextColor={theme.fontColorContent}/>

            <TouchableOpacity onPress={()=>setComponent({icon:'', type:carComponents[selectedComponent], name: nameComponent, description:descriptionComponent})}>
                <Text>Add component</Text>
            </TouchableOpacity>
          </View>
      </Modal>
  )
}

export default AddComponentModal

const style = StyleSheet.create({
    modalContainer: {
        width:"70%", 
        position:'absolute',
        left:55,
        top:200, 
        flex: .5,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal:10,
        borderWidth:1,
        borderRadius:15,
    },
    imageCarComponent: {
        width:300,
        height:200
    }
})

