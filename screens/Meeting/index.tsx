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
       headerTitle: () => <Text style={{ marginLeft:5, fontSize:23, letterSpacing:1, fontWeight:'bold', color:theme.fontColor}}>
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

      // headerRight: () => 
      // <View style={{flexDirection:'row', alignItems:'center'}}>
      //   <TouchableOpacity style={style.iconPadding} onPress={() => 
      //     navigation.navigate('Chats')
      //   }>
      //     <Icon type='materialicon' name={'messenger-outline'} size={24} color={theme.fontColor} style={{ marginRight: 10, opacity: .9 }}/>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={style.iconPadding} onPress={() => navigation.navigate('Profile', {state: user})}>
      //     <Icon type='ionicon' name={'md-person-outline'} size={24} color={theme.fontColor} style={{ marginRight: 0 }}/>
      //   </TouchableOpacity>
      // </View>
    })
  }, [theme])

  
  return (
    <View style={{flex:1, position:'relative',alignItems:'center', justifyContent:'center', backgroundColor:theme.background}}>   
      {/* <Text style={{color: theme.fontColor}}>Meeting screen</Text> */}
      <HeaderTopProjects/>
    </View>
  )
}
  
export default MeetingScreen