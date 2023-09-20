import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { selectNavigation, setNavigation } from '../slices/navigationSlice';
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'
import { Icon } from '@rneui/base';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import _Icon_SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { translations } from './../utils/translations';
import { selectLanguage } from './../slices/languageSlice';
import { globalStyles } from '../utils/globalStyles';

const SCREEN_HEIGHT = Dimensions.get('screen').height
const SCREEN_WIDTH = Dimensions.get('screen').width

export const RightNavigation = () => {
    const {logoutText, links: { add, chats, group, profile, reviews, settings}} = translations.navigation.rightNavigation
    const translateX = useSharedValue(0)
    const translateXBackground = useSharedValue(0)
    const theme = useSelector(selectTheme)
    const language = useSelector<string>(selectLanguage)
    const navigation = useNavigation<any>()
    const { user, logout }:any = useAuth()
    const dispatch = useDispatch()
    const showNavigation = useSelector(selectNavigation)

    const rNavigationContentSheetStyle = useAnimatedStyle(() => {  
      return {       
        transform: [{translateX: translateX.value}]
      }
    })

    const rBackgroundSheetStyle = useAnimatedStyle(() => {  
        return {        
          transform: [{translateX: translateXBackground.value}]
        }
    })

    useEffect(() => {
      if(showNavigation) {
        translateX.value = withSpring(SCREEN_WIDTH/3, {damping:100})
        translateXBackground.value = withSpring(-200)
      }
      else{
        translateX.value = withSpring(SCREEN_WIDTH+100)
        translateXBackground.value = withSpring(-SCREEN_WIDTH-200)
      }

    }, [showNavigation])

    const context = useSharedValue({x: 0})


    const gesture = Gesture.Pan()
    .onStart(()=> {
      context.value = { x: translateX.value }
    })
    .onUpdate((event)=> {
        translateX.value = event.translationX + context.value.x;

      if(translateX.value<SCREEN_WIDTH/3){
        translateX.value = withSpring(SCREEN_WIDTH/3)
      }
    })
    .runOnJS(true)
    .onEnd(()=> {
      if(translateX.value>SCREEN_WIDTH/3){
        translateX.value = withSpring(SCREEN_WIDTH+100)
        translateXBackground.value = withSpring(-SCREEN_WIDTH-200)
        dispatch(setNavigation(false))
      }
    })

  return (<>
    <SafeAreaView style={{flex:1, position:'absolute', marginTop: 
      StatusBar.currentHeight
    }}>
    <GestureDetector gesture={gesture}>
        <Animated.View style={[style.containerNavigation, rNavigationContentSheetStyle, {backgroundColor: theme.background}]}>
        <View style={{width:SCREEN_WIDTH/1.5 , justifyContent:'space-between', flex:1}}>
            <View>
                <View style={[style.header, {backgroundColor: theme.background}]}>
                    <TouchableOpacity style={{borderRadius:15, backgroundColor: theme.background, paddingVertical:5, paddingHorizontal:7}} onPress={()=>dispatch(setNavigation(false))}>
                        <_Icon_Ionicons name={'close'} size={23} color={theme.fontColor} style={{ marginRight: 0 }}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => (navigation.navigate('Profile', {uid: user.uid, displayName:user.name}), dispatch(setNavigation(false)))} 
                        style={style.profileButton}
                    >
                        <Text style={[style.name, {color: theme.fontColor}]}>{user?.name}</Text>
                        <Avatar size={32} rounded source={{uri:user?.imageUri}}/>
                    </TouchableOpacity>
                </View>
        
                <View style={style.content}>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Profile', {uid: user.uid, displayName:user.name}), dispatch(setNavigation(false)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>
                          {profile[language as keyof typeof profile]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={style.link} onPress={() => (navigation.navigate('Groups'), dispatch(setNavigation(false)))}>
                        <Text style={[style.linkText, {color: theme.fontColor}]}>
                          {group[language as keyof typeof group]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Create', {state: user}), dispatch(setNavigation(false)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>
                          {add[language as keyof typeof add]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Chats', {state: user}), dispatch(setNavigation(false)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>
                          {chats[language as keyof typeof chats]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity>           
                </View>
            </View>

                <View style={style.bottomContent}>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Settings'), dispatch(setNavigation(false)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>
                          {settings[language as keyof typeof settings]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => (navigation.navigate('Reviews'), dispatch(setNavigation(false)))} style={style.link}>
                        <Text style={[style.linkText, {color: globalStyles.background_2}]}>
                          {reviews[language as keyof typeof reviews]}
                        </Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={15} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> (logout(), dispatch(setNavigation(false)))}  style={[style.logoutButton, {backgroundColor: theme.backgroundContent}]}>
                        <Text style={[{color:theme.fontColorContent, marginRight:13}]}>
                          {logoutText[language as keyof typeof logoutText]}
                        </Text>
                        <_Icon_SimpleLineIcons name="logout" size={16} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    </GestureDetector>    


    <Animated.View style={[style.backgroundNavigation, rBackgroundSheetStyle]}>
      {/* <Text>RightNavigation</Text>
      <TouchableOpacity onPress={()=>dispatch(setNavigation(false))} style={{padding:30}}>
        <_Icon name={'menu-outline'} size={26 } color={theme.fontColor} style={{ marginRight: 0 }}/>
      </TouchableOpacity> */}
    </Animated.View>
    </SafeAreaView>
  </>
  )
}

const style = StyleSheet.create({
    containerNavigation: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT-35,    
        position:'absolute',
        top:-35,
        paddingTop: 15,
        zIndex:11
    },
    backgroundNavigation: {
        backgroundColor: 'rgba(1, 1, 1, .5)',
        width:SCREEN_WIDTH+200,
        height:SCREEN_HEIGHT+0,
        position:'absolute',
        top:-35,
        paddingTop: 35,
        zIndex:10
    },
    header: {
        borderRadius:0,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
        justifyContent:'space-between'
    },
    profileButton:{
        flexDirection: 'row',
        alignItems:'center'
    },
    name: {
        marginRight:7,
        fontSize:16,
        color:'#293',
        fontWeight:'bold'
    },
    content: {
      marginTop:10,
        alignSelf:'flex-start',
        paddingHorizontal:20,
        // alignItems:'center',
        width:SCREEN_WIDTH-130,
    },
    link: {
        flexDirection:'row',
        alignItems:'center',
        marginVertical:7,
        justifyContent:'space-between'
    },
    linkText: {
        fontSize:15,
        marginRight:10,
        letterSpacing:1
    },
    bottomContent: {
        marginBottom:30,
        paddingHorizontal:20,
        // alignItems:'center',
        width:SCREEN_WIDTH-130,
    },
    logoutButton: {
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'flex-end',
        paddingHorizontal:20,
        paddingVertical:7,
        marginTop:15,
        borderRadius:35
    }
})
