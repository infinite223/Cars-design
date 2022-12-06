import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { style } from './style';
import useAuth from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';
import _Icon from 'react-native-vector-icons/Ionicons'

import { setNavigation } from '../../slices/navigationSlice';
import { useProjects } from '../../hooks/useProjects';

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()
  const { projects, loading }  = useProjects(user)
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TextInput placeholder={language==="en"?_translations.en:_translations.pl} placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      headerLeft: () => <Image style={style.logo} source={require('../../assets/cars_projects_IconV2.png')}/>,

      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity style={style.iconPadding} 
          onPress={() => dispatch(setNavigation(true))}
        >
          <_Icon name={'menu-outline'} size={26 } color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>
    })
  }, [theme])

  
  return (
    <View style={{flex:1, position:'relative',alignItems:'center', justifyContent:'center', backgroundColor:theme.background}}>
      {loading&&<LoadingView headerText={'Loading projects'}/>}
      {projects.length>0?<FlatList 
        style={{ width: '100%'}}
        contentContainerStyle={{flexGrow:1}}
        data={projects}
        pagingEnabled
        
        bounces
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> 
        <Carproject data={carData.item}/>
      }
      />:<View>
          <Text style={[{color: theme.fontColorContent}]}>No projects...</Text>
        </View>}
    </View>
  )
}
  
export default HomeScreen