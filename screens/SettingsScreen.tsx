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

const SettingsScreen = () => {
  const theme = useSelector(selectTheme)
  const navigation:any = useNavigation()
  const { user, logout }:any = useAuth()

  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
  const [themeModalVisible, setThemeModalVisible] = useState(false)
  const [informationModalVisible, setInformationModalVisible] = useState(false)
  const [languageModalVisible, setLanguageModalVisible] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>Settings</Text>,
       headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
        </TouchableOpacity>
    )})
  }, [theme])

  return (
    <View style={[style.settingsContainer, {backgroundColor:theme.background}]}>
        <ThemeModal  modalVisible={themeModalVisible} setModalVisible={setThemeModalVisible}/>
        <InformationModal  modalVisible={informationModalVisible} setModalVisible={setInformationModalVisible}/>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
        <LanguageModal modalVisible={languageModalVisible} setModalVisible={setLanguageModalVisible}/>
        <TouchableOpacity style={style.option} onPress={()=>setThemeModalVisible(true)}>
            <Ionicons name='color-palette-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>Theme</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setInformationModalVisible(true)}>
            <Octicons name='info' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>Information</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setEditProfileModalVisible(true)}>
            <Ionicons name='person-circle-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>Edit Profile</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={style.option} onPress={()=>setLanguageModalVisible(true)}>
            <Ionicons name='language-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>Language</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={style.option}>
            <Ionicons name='notifications-outline' size={24} color={theme.fontColor}/>
            <Text style={[style.optionName, {color:theme.fontColor}]}>Notifications</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> logout()}>
            <Text style={{fontSize:15, color:theme.fontColor}}>Log Out</Text>    
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
    }
})