import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { setTheme } from './../../../slices/themeSlice'
import { selectLanguage } from './../../../slices/languageSlice';
import { translations } from './../../../utils/translations';


const ThemeModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const _translations = translations.screens.modals.settingsModals.themeModal.headerText
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
            borderRadius:15,
        }}>
            <Text style={{color: theme.fontColor, fontSize:22, marginTop:10, marginBottom:20}}>{language==="en"?_translations.en:_translations.pl}</Text>
            <View style={{flex:1, width:'100%', flexDirection:'row', height:"100%", alignItems:'center', justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>(dispatch(setTheme({
                        background:'white',
                        backgroundContent:'#eee',
                        fontColor:'black',
                        fontColorContent: '#333'
                    }
                    )), setModalVisible(!modalVisible))} 
                    style={{
                        alignItems:'center', justifyContent:'center',
                        backgroundColor: theme.background==="white"?theme.backgroundContent:theme.background,
                        borderRadius:15, paddingHorizontal:20, paddingVertical:8, paddingTop:12
                    }}>
                        <View style={{borderColor:theme.backgroundContent, borderWidth:1,backgroundColor:'white', width:70, height:70, borderRadius:20}}></View>
                        <Text style={{color:theme.fontColor, fontSize:15, paddingVertical:5}}>{language==="en"?"White":"Jasny"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>(dispatch(setTheme({
                        background:'black', 
                        backgroundContent:'#333',
                        fontColor:'white',
                        fontColorContent: '#aaa'
                       })), setModalVisible(!modalVisible))}
                    style={{
                        alignItems:'center', justifyContent:'center', 
                        backgroundColor:  theme.background==="black"?theme.backgroundContent:theme.background,
                        borderRadius:15, paddingHorizontal:20, paddingVertical:8, paddingTop:12
                    }}>
                        <View style={{borderColor:theme.backgroundContent, borderWidth:1, backgroundColor:'black', width:70, height:70, borderRadius:20}}></View>
                        <Text style={{color:theme.fontColor, fontSize:15, paddingVertical:5}}>{language==="en"?"Black":'Ciemny'}</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
  )
}

export default ThemeModal