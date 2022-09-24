import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import useAuth from '../hooks/useAuth';
import { MaterialIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import EditProfileScreen from './modals/SettingsModals/EditProfileModal';
import ThemeModal from './modals/SettingsModals/ThemeModal';
import InformationModal from './modals/SettingsModals/InformationModeal';
import LanguageModal from './modals/SettingsModals/LanguageModal';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';

const SettingsScreen = () => {
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const { HeaderText, InfoText, LanguageText, NotifyText, ProfileText, ThemeText, logOutText } = translations.screens.SettingsScreen
  const navigation:any = useNavigation()
  const { user, logout }:any = useAuth()

  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
  const [themeModalVisible, setThemeModalVisible] = useState(false)
  const [informationModalVisible, setInformationModalVisible] = useState(false)
  const [languageModalVisible, setLanguageModalVisible] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>
            {language==="en"?HeaderText.en:HeaderText.pl}
        </Text>,
       headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
        </TouchableOpacity>
    )})
  }, [theme, language])

  return (
    <View style={[style.settingsContainer, {backgroundColor:theme.background}]}>
        <ThemeModal  modalVisible={themeModalVisible} setModalVisible={setThemeModalVisible}/>
        <InformationModal  modalVisible={informationModalVisible} setModalVisible={setInformationModalVisible}/>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
        <LanguageModal modalVisible={languageModalVisible} setModalVisible={setLanguageModalVisible}/>
        <TouchableOpacity style={style.option} onPress={()=>setThemeModalVisible(true)}> 
            <Ionicons name='color-palette-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?ThemeText.en:ThemeText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setInformationModalVisible(true)}>
            <Octicons name='info' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?InfoText.en:InfoText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setEditProfileModalVisible(true)}>
            <Ionicons name='person-circle-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?ProfileText.en:ProfileText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setLanguageModalVisible(true)}>
            <Ionicons name='language-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?LanguageText.en:LanguageText.pl}</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={style.option}>
            <Ionicons name='notifications-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?NotifyText.en:NotifyText.pl}</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> logout()} style={style.logOutButton}>
            <Text style={{fontSize:18, color:theme.fontColor}}>{language==="en"?logOutText.en:logOutText.pl}</Text>    
        </TouchableOpacity> 
    </View>
  )
}

export default SettingsScreen


const style = StyleSheet.create({
    settingsContainer: {
        flex:1,
        paddingHorizontal:15,
    },
    option: {
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
    },
    optionName: {   
        fontSize:18,
        marginLeft:10
    },
    logOutButton: {
        marginVertical:10
    }
})