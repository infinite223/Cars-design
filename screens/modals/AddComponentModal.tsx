import { FlatList, Modal, StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Component } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { TextInput } from 'react-native-gesture-handler';
import CustomInput from '../../components/CustomInput';
import { Icon } from '@rneui/base';

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
        <KeyboardAvoidingView>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
        <View style={style.modal}>
          <View style={[style.modalContainer, {borderColor:theme.backgroundContent,  backgroundColor:theme.background}]}>
            <Text style={[style.headerText, {color: theme.fontColor}]}>
                Choose component
            </Text>
            <FlatList
                horizontal
                ItemSeparatorComponent={()=><View style={{width:theme.background=='white'?5:20}}/>}
                showsHorizontalScrollIndicator={false}
                data={carComponents}
                renderItem={({item, index})=> (
                    <TouchableOpacity 
                    onPress={()=>setSelectedComponent(index)} style={[{alignItems:'center'},  theme.background=='white'&&{backgroundColor:'#999', borderRadius:10, paddingHorizontal:10, paddingVertical:5}]}>
                        <Image
                            style={[style.imageCarComponent]}
                            source={
                                item==='turbo'?require('../../assets/componentsIcons/turbo_white.png'):
                                item==='intercooler'?require('../../assets/componentsIcons/intercooler_white.png'):
                                item==='engine'?require('../../assets/componentsIcons/engine_white.png'):
                                item==='exhaust'?require('../../assets/componentsIcons/exhaust_white.png'):
                                require('../../assets/componentsIcons/transmission_white.png')
                            }
                        />
                        <Text style={[{color:theme.fontColorContent}]}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={{ width:'100%', marginVertical:10}}>
                <CustomInput fontSize={16} setValue={setNameComponent} placeholder='Name component' helpText='(np. K03, N54, 2JZ)'/> 
                <CustomInput fontSize={16} setValue={setNameComponent} placeholder='Description component'/> 
            </View>
            <View style={style.footer}>
                <TouchableOpacity style={style.exitButton} onPress={()=>setModalVisible(false)}>
                    {/* <Text style={[{color: theme.fontColor}]}></Text> */}
                    <Icon type='feather' name='x' size={18} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity style={style.addComponentButton} onPress={()=>setComponent({icon:'', type:carComponents[selectedComponent], name: nameComponent, description:descriptionComponent})}>
                    <Text style={[{color: 'white'}]}>Add component</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
      </Modal></KeyboardAvoidingView>
  )
}

export default AddComponentModal

const style = StyleSheet.create({
    modal: {
        width:"100%", 
        height:'100%',
        // position:'relative',

        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    modalContainer: {
       alignItems:'center',
       justifyContent:'flex-start',
        width:'90%',
        //minHeight:450,
        paddingHorizontal:30,
        paddingVertical:20,
        borderWidth:1,
        borderRadius:15,
    },
    headerText: {
        fontSize:17,
        letterSpacing:1,
        marginVertical:10
    },
    imageCarComponent: {
        width:50,
        height:50,
        marginVertical:10,
    
    },
    footer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    exitButton: {
        margin:10,
        borderRadius:15,
        backgroundColor:'#D23',
        paddingHorizontal:10,
        paddingVertical:8
    },
    addComponentButton: {
        marginVertical:10,
        backgroundColor:'#273',
        paddingHorizontal:15,
        paddingVertical:7,
        borderRadius:15
    }
})

