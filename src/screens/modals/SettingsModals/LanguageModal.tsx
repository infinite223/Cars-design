import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { selectLanguage } from './../../../slices/languageSlice';
import { setLanguage } from './../../../slices/languageSlice'
import { translations } from '../../../utils/translations'

const LanguageModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
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
            borderRadius:5,
        }}>
            <Text style={{color: theme.fontColor, fontSize:22, marginTop:10, marginBottom:30}}>
                {language==="en"?_translations.en:_translations.pl}
            </Text>
            <View style={{flex:1, width:'100%', flexDirection:'row', height:"100%", alignItems:'center', justifyContent:'space-around'}}>
                <TouchableOpacity
                    onPress={()=> (dispatch(setLanguage('pl')), setModalVisible(!modalVisible))}
                    style={{
                        backgroundColor: language==='pl'?theme.backgroundContent:theme.background, borderColor: theme.backgroundContent, borderRadius:50,
                        alignItems:'center', justifyContent:'center'
                }}>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingHorizontal:20, paddingVertical:5}}>Polski</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>(dispatch(setLanguage('en')), setModalVisible(!modalVisible))}
                    style={{
                        backgroundColor: language==='en'?theme.backgroundContent:theme.background, borderColor: theme.backgroundContent, borderRadius:50,
                        alignItems:'center', justifyContent:'center'
                }}>
                        <Text style={{color:theme.fontColor, fontSize:20, paddingHorizontal:20, paddingVertical:5}}>English</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
  )
}

export default LanguageModal