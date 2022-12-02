import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { SearchBar } from '@rneui/base';
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth, { db } from '../../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import _Icon from 'react-native-vector-icons/Entypo'
import { data } from '../../utils/data';
import EditProfileScreen from './../modals/SettingsModals/EditProfileModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { RouteProp } from '@react-navigation/native';

import { style } from './style';
import { FilterProjects } from './../../components/FilterProjects';
import Animated, { Extrapolate, interpolate, timing, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CarprojectData, User, UserList } from '../../utils/types';
import { BottomOptions } from '../../components/BottomOptions';
import { UsersList } from '../../components/UsersList';
import { collection, collectionGroup, getDocs, onSnapshot } from 'firebase/firestore';
import AlertModal from '../modals/AlertModal';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


type ProfileScreenProps = {
    A: undefined;
    B: {
      state: {uid:string, displayName:string}
    };
  }

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<RouteProp<ProfileScreenProps, 'B'>>()
    const [showOptions, setShowOptions] = useState<{show:boolean, selectedProject: CarprojectData | null}>({show:false, selectedProject: null})
    const [showUsersList, setShowUsersList] = useState<{show:boolean, users: UserList[] | null, headerText: string}>({show:false, users: null, headerText:''})
    const [showAlert, setShowAlert] = useState<{show:boolean, message:string, type?:string}>()

    const profileUser = route.params.state;
   
    const [userProjects, setUserProjects] = useState<any>([])
    const [search, setSearch] = useState('')
    const {user}:any = useAuth()
    const isMyProfile = user.uid===profileUser.uid
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText, addProjectButton } = translations.screens.ProfileScreen
    
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:15, fontSize:20, color:theme.fontColor}}>
            {user.name}
            </Text>,
           headerLeft: () => (
            <View style={style.headerLeftContainer}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon
                        size={24}
                        name='arrow-back-ios'
                        type='MaterialIcons'
                        color={theme.fontColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Avatar
                        size={38}
                        rounded
                        source={{uri: user.imageUri}}    
                    />
                </TouchableOpacity>
            </View>
          )
        })  
      }, [theme])

      const translateX = useSharedValue(-1200)

      const rAllContentSheetStyle = useAnimatedStyle(() => {  
        return {       
            transform: [{translateY: translateX.value}]
        }
      })          

      useEffect(() => {
        const getProjects = () => {
            const projectsRef = collection(db, 'users', user.uid, 'projects')
             onSnapshot(projectsRef, (snapchot) => { 
                console.log('read')
                setUserProjects(snapchot.docs.map((doc, i)=> {
                    return {id: doc.id, car:doc.data(), author:user, createdAt:'22.11.2022'}
                }))      
                })
            }
          getProjects()
      }, [])
      
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        {(showAlert && showAlert.type)&&<AlertModal resetError={setShowAlert} show={true} message={showAlert?.message} type={showAlert?.type}/>}
      <Animated.View style={[rAllContentSheetStyle, {backgroundColor:`rgba(1, 1, 1, .5)`, zIndex:9, position:'absolute', width: SCREEN_WIDTH, height:SCREEN_HEIGHT+100}]}/>
        <View style={{marginVertical:5}}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>
                {language==="en"?headerText.en:headerText.pl}
            </Text>
            <Text style={{color:theme.fontColorContent}}>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.a
                 Blanditiis, nostrum...
            </Text>
        </View>


        <View style={[style.infoContainer, {borderBottomColor: theme.backgroundContent, borderTopColor: theme.backgroundContent}]}>
            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{uid:user.uid, imageUri:'', name:'Dawid'}], headerText:`${[{}].length} followers`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followersText.en:followersText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>{user.stats.followers.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{uid:user.uid, imageUri:'', name:'Dawid'}], headerText:`${[{},{},{},{},{}].length} views`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?viewsText.en:viewsText.pl}</Text>
                <Text style={{fontSize:20,  color: theme.fontColor}}>{user.stats.views.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{uid:user.uid, imageUri:'', name:'Dawid'}], headerText:`${[{},{},{}].length} followed`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followingText.en:followingText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>{user.stats.following.length}</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:0, position:'relative'}}>
            <Text style={[style.titleText, {color:theme.fontColor}]}>{language==="en"?headerProjectsText.en:headerProjectsText.pl}</Text>        
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Icon type='evilicon' name='search' size={30} color={theme.fontColorContent}/>
                    <TextInput
                        style={{color: theme.fontColor, marginLeft:10}}
                        placeholder={`Search ${isMyProfile&&'my'} project`}
                        placeholderTextColor={theme.fontColorContent}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Create')} style={[style.addProjectButton, {backgroundColor: '#272'}]}>
                    <Text style={[{color:'white', fontSize:12}]}>
                        {language==='en'?addProjectButton.en:addProjectButton.pl}
                    </Text>
                </TouchableOpacity>
            </View>
           
            <FilterProjects setShowUsersList={setShowUsersList} userProjects={userProjects} input={search} edit={isMyProfile} showOptions={showOptions.show} setShowOptions={setShowOptions}/>   
            <UsersList isMyProfile showUsersList={showUsersList} translateX={translateX} setShowUsersList={setShowUsersList}/>
            <BottomOptions setShowAlert={setShowAlert} isMyProfile={isMyProfile} translateX={translateX} showOptions={showOptions} setShowOptions={setShowOptions}/>
        </View>
    </View>
  )
}

export default ProfileScreen

