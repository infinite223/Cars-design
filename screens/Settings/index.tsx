import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import EditProfileScreen from './../modals/SettingsModals/EditProfileModal';
import ThemeModal from './../modals/SettingsModals/ThemeModal';
import InformationModal from './../modals/SettingsModals/InformationModeal';
import LanguageModal from './../modals/SettingsModals/LanguageModal';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { Icon } from '@rneui/themed';
import { style } from './style';

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:5}}>
         <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
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
            <Icon type="ionicon" name='color-palette-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?ThemeText.en:ThemeText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setInformationModalVisible(true)}>
            <Icon type='octicon' name='info' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?InfoText.en:InfoText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setEditProfileModalVisible(true)}>
            <Icon type="ionicon" name='person-circle-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?ProfileText.en:ProfileText.pl}</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setLanguageModalVisible(true)}>
            <Icon type='ionicon' name='language-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?LanguageText.en:LanguageText.pl}</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={style.option}>
            <Icon type='ionicon' name='notifications-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>{language==="en"?NotifyText.en:NotifyText.pl}</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> logout()} style={[style.logOutButton, {backgroundColor:theme.backgroundContent}]}>
            <Text style={{fontSize:18, color:theme.fontColor}}>
                {language==="en"?logOutText.en:logOutText.pl}
                <Text style={{letterSpacing:1, fontWeight:'bold'}}>{user.name==="Tester"&&' DEMO'}</Text>
            </Text>       
        </TouchableOpacity> 
    </View>
  )
}

export default SettingsScreen

