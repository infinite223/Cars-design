import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Feather, MaterialIcons } from 'react-native-vector-icons'
import Carproject from '../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { CarprojectData } from '../utils/types';
import { selectTheme } from '../slices/themeSlice';
import { data } from '../utils/data';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from '../utils/translations'; 
import { HeaderTopProjects } from './../components/HeaderTopProjects';

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TextInput placeholder={language==="en"?_translations.en:_translations.pl} placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      headerLeft: () => <Image style={style.logo} source={require('./../assets/cars_projects_IconV2.png')}/>,

      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Chats')}><MaterialIcons name={'messenger-outline'} size={22} color={theme.fontColor} style={{ marginRight: 15, opacity: .7 }}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Ionicons name={'md-person-outline'} size={22} color={theme.fontColor} style={{ marginRight: 0 }}/></TouchableOpacity>
      </View>
    })
  }, [theme])

  return (
    <View style={{flex:1,  backgroundColor:theme.background}}>
      <FlatList style={{flex:1, height:"100%"}}
        data={data}
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> <Carproject data={carData.item}/>}
        ListHeaderComponent={()=> {
          return <HeaderTopProjects/>
        }}
      />
    </View>
  )
}
  
export default HomeScreen

const style = StyleSheet.create({
  projectsContainer: {

  },
  logo: {
    width:40,
    height:40,
    borderRadius:10,
    marginRight:10
  }
})