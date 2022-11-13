import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { data } from '../../utils/data';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { HeaderTopProjects } from './../../components/HeaderTopProjects';
import { Icon } from '@rneui/themed';
import { style } from './style';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import useAuth from './../../hooks/useAuth';

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()

  const db = getFirestore()

  const addData = async () => {

  }
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TextInput placeholder={language==="en"?_translations.en:_translations.pl} placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      headerLeft: () => <Image style={style.logo} source={require('../../assets/cars_projects_IconV2.png')}/>,

      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity style={style.iconPadding} onPress={() => 
          navigation.navigate('Chats')
        }>
          <Icon type='materialicon' name={'messenger-outline'} size={24} color={theme.fontColor} style={{ marginRight: 10, opacity: .9 }}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.iconPadding} onPress={() => navigation.navigate('Profile', {state: user})}>
          <Icon type='ionicon' name={'md-person-outline'} size={24} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>
    })
  }, [theme])

  
  return (
    <View style={{flex:1,  backgroundColor:theme.background}}>
      <FlatList style={{flex:1, height:"100%"}}
         ListHeaderComponent={()=> {
          return <HeaderTopProjects/>
        }}
        data={data}
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> <Carproject data={carData.item}/>}
      />
    </View>
  )
}
  
export default HomeScreen