import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { SearchBar } from '@rneui/base';
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
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
import { CarprojectData, User } from '../../utils/types';
import { BottomOptions } from '../../components/BottomOptions';
import { UsersList } from '../../components/UsersList';

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
    const [showUsersList, setShowUsersList] = useState<{show:boolean, users: User[] | null, headerText: string}>({show:false, users: null, headerText:''})

    const profileUser = route.params.state;
   
    const [userProjects, setUserProjects] = useState([...data])
    const [search, setSearch] = useState('')
    const {user}:any = useAuth()
    const isMyProfile = user.uid===profileUser.uid
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText, addProjectButton } = translations.screens.ProfileScreen
    
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:15, fontSize:20, fontWeight:'bold', color:theme.fontColor}}>
            {user.uid?profileUser.displayName:'Demo'}
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
                        source={{uri:data[0].author.imageUri}}    
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

  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
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
            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{email:'',imageUri:'', name:'Dawid'}], headerText:`${[{}].length} followers`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followersText.en:followersText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{email:'',imageUri:'', name:'Dawid'}], headerText:`${[{},{},{},{},{}].length} views`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?viewsText.en:viewsText.pl}</Text>
                <Text style={{fontSize:20,  color: theme.fontColor}}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:[{email:'',imageUri:'', name:'Dawid'}], headerText:`${[{},{},{}].length} followed`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followingText.en:followingText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>3</Text>
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
            <BottomOptions isMyProfile={isMyProfile} translateX={translateX} showOptions={showOptions} setShowOptions={setShowOptions}/>
        </View>
    </View>
  )
}

export default ProfileScreen

