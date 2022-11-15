import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { SearchBar } from '@rneui/base';
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { data } from '../../utils/data';
import EditProfileScreen from './../modals/SettingsModals/EditProfileModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { RouteProp } from '@react-navigation/native';

import { style } from './style';
import { FilterProjects } from './../../components/FilterProjects';


type ProfileScreenProps = {
    A: undefined;
    B: {
      state: {uid:string, displayName:string}
    };
  }

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<RouteProp<ProfileScreenProps, 'B'>>()
    const profileUser = route.params.state;
   
    const [userProjects, setUserProjects] = useState([...data])
    const [search, setSearch] = useState('')
    const { user, logout }:any = useAuth()
    const isMyProfile = user.uid===profileUser.uid
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText, addProjectButton } = translations.screens.ProfileScreen
    
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:25, fontSize:17, color:theme.fontColor}}>
            {user.uid?profileUser.displayName:'Demo'}
            </Text>,
           headerLeft: () => (
            <View style={style.headerLeftContainer}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:20}}>
                    <Icon
                        size={24}
                        name='arrow-back-ios'
                        type='MaterialIcons'
                        color={theme.fontColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{marginVertical:10, marginLeft:10}} onPress={() => setEditProfileModalVisible(true)}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:data[0].author.imageUri}}    
                    />
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => <View style={style.headerRightContainer}> 
           <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{flexDirection:'row', alignItems:'center', position:'relative'}}>  
                <Text style={{fontSize:15, zIndex:5, color: theme.fontColor, fontStyle:'italic', letterSpacing:1, fontFamily:'tahoma'}}>Spot</Text>         
                <Icon
                    name='plus'
                    type='entypo'
                    size={25} 
                    color={'#2b3'}
                    style={{zIndex:3, right:5, top:-5}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={{paddingRight:8, paddingLeft:3}}>   
                <Icon                 
                    name='ios-settings-outline'
                    type='ionicon'
                    size={23} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>
          </View>
        })  
      }, [theme])

  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
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
            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followersText.en:followersText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>23</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?viewsText.en:viewsText.pl}</Text>
                <Text style={{fontSize:20,  color: theme.fontColor}}>50</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followingText.en:followingText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>65</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:0}}>
            <Text style={[style.titleText, {color:theme.fontColor}]}>{language==="en"?headerProjectsText.en:headerProjectsText.pl}</Text>        
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Icon type='evilicon' name='search' size={35} color={theme.fontColorContent}/>
                    <TextInput
                        style={{color: theme.fontColor, marginLeft:15}}
                        placeholder='Search project'
                        placeholderTextColor={theme.fontColorContent}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Create')} style={[style.addProjectButton, {backgroundColor: '#272'}]}>
                    <Text style={[{color:'white', fontSize:13, letterSpacing:1, fontWeight:'400'}]}>
                        {language==='en'?addProjectButton.en:addProjectButton.pl}
                    </Text>
                </TouchableOpacity>
            </View>
           
          
            <FilterProjects userProjects={userProjects} input={search}/>
           
        </View>
    </View>
  )
}

export default ProfileScreen

