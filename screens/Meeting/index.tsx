import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { data } from '../../utils/data';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { HeaderTopProjects } from './../../components/HeaderTopProjects';
import { Icon } from '@rneui/themed';
import _Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { doc, getFirestore, setDoc, collectionGroup, onSnapshot } from 'firebase/firestore';
import useAuth from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';

const MeetingScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const [projects, setProjects] = useState<any>([])
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()

  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () => <Text style={{ marginLeft:5, fontSize:20, letterSpacing:1, fontWeight:'300', color:theme.fontColor}}>
          Meetings 
       </Text>,
    })  
  }, [theme])

  const db = getFirestore()

  useEffect(() => {
    const getProjects = () => {
      const projectsRef = collectionGroup(db, 'projects')
       onSnapshot(projectsRef, (snapchot) => {      
        setProjects(snapchot.docs.map((doc, i)=> {
          return {id: i, car:doc.data(), author:user, createdAt:'22.11.2022'}
        }))      
      })
    }
  
    getProjects()
  }, [])
  
   
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: () => <TextInput placeholder={language==="en"?_translations.en:_translations.pl} placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      // headerLeft: () => <Image style={style.logo} source={require('../../assets/cars_projects_IconV2.png')}/>,

      headerRight: () => 
        <TouchableOpacity style={{paddingHorizontal:20, paddingVertical:5, marginRight:5}} onPress={() => navigation.navigate('CreateMeeting')}>
          <_Icon_MaterialCommunityIcons name={'account-multiple-plus-outline'} size={27} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
    })
  }, [theme])

  
  return (
    <View style={{flex:1, justifyContent:'flex-start', backgroundColor:theme.background}}>   
      {/* <Text style={{color: theme.fontColor}}>Meeting screen</Text> */}
      <HeaderTopProjects/>
    </View>
  )
}
  
export default MeetingScreen