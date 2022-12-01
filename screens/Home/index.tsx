import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { data } from '../../utils/data';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { HeaderTopProjects } from './../../components/HeaderTopProjects';
import { Icon } from '@rneui/themed';
import { style } from './style';
import { doc, getFirestore, setDoc, collectionGroup, onSnapshot, getDoc, collection } from 'firebase/firestore';
import useAuth from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';
import _Icon from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RightNavigation } from '../../navigation/RightNavigation';
import { setNavigation } from '../../slices/navigationSlice';
import EditProfileModal from '../modals/SettingsModals/EditProfileModal';

const SCREEN_WIDTH = Dimensions.get('window').width 

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const [projects, setProjects] = useState<any>([])
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()

  const db = getFirestore()

  useEffect(() => {
    // const getUserData = async () => {
    //   const usersRef = doc(db, "users", user.uid);
    //   const docSnap = await getDoc(usersRef);
    //   if (docSnap.data()?.name) {
    //     console.log('coś jest xd', docSnap.data())
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //     navigation.navigate('EditProfile')
    //   }
    // }

    const getProjects = () => {
      const projectsRef = collectionGroup(db, 'projects')
       onSnapshot(projectsRef, (snapchot) => {      
        setProjects(snapchot.docs.map((doc, i)=> {
          return {id: i, car:doc.data(), author:user, createdAt:'22.11.2022'}
        }))      
      })
    }
    // getUserData()
    getProjects()
  }, [])
  
   
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
      {projects.length<=0&&<LoadingView headerText={'Loading projects'}/>}
      <FlatList style={{flex:1, height:"100%", width: '100%'}}
        data={projects}
        bounces
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> 
        <Carproject data={carData.item}/>
      }
      />
    </View>
  )
}
  
export default HomeScreen