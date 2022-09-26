import { View, Text, Modal, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { selectLanguage } from './../../../slices/languageSlice';
import { setLanguage } from './../../../slices/languageSlice'
import { translations } from '../../../utils/translations'


const LanguageModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const _translations = translations.screens.modals.settingsModals.languageModal.header
    const dispatch = useDispatch()

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
            width:"70%", 
            position:'absolute',
            left:55,
            top:200,
            flex: .5,
            justifyContent: 'space-between',
            alignItems: "center",
            backgroundColor:theme.background,
            paddingHorizontal:10,
            paddingVertical:15,
            borderColor:theme.backgroundContent,
            borderWidth:1,
            borderRadius:10,
        }}>
            <Text style={{color: theme.fontColor, fontSize:22, marginVertical:20}}>
                {language==="en"?_translations.en:_translations.pl}
            </Text>
            <View style={{flex:1, width:'100%', flexDirection:'row', height:"100%", alignItems:'center', justifyContent:'space-around'}}>
                <TouchableOpacity
                    onPress={()=> (dispatch(setLanguage('pl')), setModalVisible(!modalVisible))}
                    style={{
                        borderWidth: language==='pl'?1:0, borderColor: theme.backgroundContent, borderRadius:10,
                        alignItems:'center', justifyContent:'center'
                }}>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingHorizontal:15, paddingVertical:5}}>Polski</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>(dispatch(setLanguage('en')), setModalVisible(!modalVisible))}
                    style={{
                        borderWidth: language==='en'?1:0, borderColor: theme.backgroundContent, borderRadius:10,
                        alignItems:'center', justifyContent:'center'
                }}>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingHorizontal:15, paddingVertical:5}}>English</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
  )
}

export default LanguageModal