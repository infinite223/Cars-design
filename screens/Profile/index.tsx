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
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CarprojectData } from '../../utils/types';

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
    const profileUser = route.params.state;
   
    const [userProjects, setUserProjects] = useState([...data])
    const [showOptions, setShowOptions] = useState<{show:boolean, selectedProject: CarprojectData | null}>({show:false, selectedProject: null})
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

      const translateY = useSharedValue(0)

      const rOptionsContentSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50], [20, 0], Extrapolate.CLAMP )
        const paddingTop = interpolate(translateY.value, [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50], [0, 25], Extrapolate.CLAMP )
  
        return {       
          transform: [{translateY: translateY.value}]
        }
      })

      useEffect(() => {
        if(showOptions.selectedProject!==null) translateY.value = withSpring( -SCREEN_HEIGHT/2.2, { damping: 50})

      }, [showOptions.show])
      const context = useSharedValue({y: 0})


      const gesture = Gesture.Pan()
      .onStart(()=> {
        context.value = { y: translateY.value }
      })
      
      .onUpdate((event)=> {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT/2.2)
        translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT/10 )

      })
      .onEnd(()=> {
        if(translateY.value>-SCREEN_HEIGHT/2.6){
          translateY.value =  withSpring( -SCREEN_HEIGHT/12, { damping: 50})
        }
      })
      

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
           
            <FilterProjects userProjects={userProjects} input={search} edit={isMyProfile} showOptions={showOptions.show} setShowOptions={setShowOptions}/>   
            <GestureDetector gesture={gesture}>
                <Animated.View style={[style.optionsMenu, rOptionsContentSheetStyle, {backgroundColor: theme.backgroundContent}]}>
                    {/* <Text style={{color: theme.fontColor, padding:20}}>Options</Text> */}
                    <View style={{marginBottom:10, width:40, height:7, backgroundColor: theme.fontColorContent, borderRadius:15, alignSelf:'center'}}/>
                    <Text style={{color:'#2b3', fontWeight:'bold', alignSelf:'center'}}>
                        {showOptions.selectedProject?.car.CarMake+' '} 
                        {showOptions.selectedProject?.car.model}
                    </Text>
                    <TouchableOpacity style={[style.optionContainer]}>
                        <Icon type='materialicon' name='edit' size={22} color={theme.fontColorContent}/>
                        <Text style={[style.optionText, {color: theme.fontColor}]}>
                            Edit project
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.optionContainer]}>
                        <_Icon name='trash' size={20} color={theme.fontColorContent}/>
                        <Text style={[style.optionText, {color: theme.fontColor}]}>
                            Delete project
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.optionContainer]}>
                        <_Icon name='eye-with-line' size={20} color={theme.fontColorContent}/>
                        {/* <_Icon name='eye' size={20} color={theme.fontColorContent}/> */}

                        <Text style={[style.optionText, {color: theme.fontColor}]}>
                            Hide project
                        </Text>
                    </TouchableOpacity>
                </Animated.View>       
            </GestureDetector>    
        </View>
    </View>
  )
}

export default ProfileScreen

