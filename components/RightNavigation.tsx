import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { selectNavigation, setNavigation } from './../slices/navigationSlice';
import _Icon from 'react-native-vector-icons/Ionicons'
import { Icon } from '@rneui/base';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import useAuth from './../hooks/useAuth';
import _Icon_SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'




const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export const RightNavigation = () => {
    const translateX = useSharedValue(0)
    const translateXBackground = useSharedValue(0)
    const theme = useSelector(selectTheme)
    const navigation = useNavigation()
    const { user, logout }:any = useAuth()
    const dispatch = useDispatch()
    const showNavigation = useSelector(selectNavigation)
    const [showNav, setShowNav] = useState(false)
    console.log(showNavigation)
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
      if(showNavigation === SCREEN_WIDTH/3.5 ) {
        translateX.value = withSpring(showNavigation, {damping:100})
        translateXBackground.value = withSpring(-200)
      }
      else{
        translateX.value = withSpring(showNavigation)
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
        // translateX.value = Math.min(SCREEN_WIDTH/3.5+220)
        // translateX.value = Math.max(SCREEN_WIDTH/3.5-200)

      if( translateX.value<showNavigation){
        translateX.value = withSpring(showNavigation)
      }
    })
    .runOnJS(true)
    .onEnd(()=> {
      if(translateX.value>SCREEN_WIDTH/3){
        translateX.value = withSpring(SCREEN_WIDTH+100)
        translateXBackground.value = withSpring(-SCREEN_WIDTH-200)
        dispatch(setNavigation(SCREEN_WIDTH+100))
      }
    })
    
  return (<>
    <GestureDetector gesture={gesture} >
        <Animated.View style={[style.containerNavigation, rNavigationContentSheetStyle, {backgroundColor: theme.background}]}>
        <View style={{width:SCREEN_WIDTH/1.45, justifyContent:'space-between', flex:1}}>
            <View>
                <View style={style.header}>
                    <TouchableOpacity onPress={()=>dispatch(setNavigation(SCREEN_WIDTH+100))}>
                        <_Icon name={'menu-outline'} size={28} color={theme.fontColor} style={{ marginRight: 0 }}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => (navigation.navigate('Profile', {state: user}), dispatch(setNavigation(SCREEN_WIDTH+100)))} 
                        style={style.profileButton}
                    >
                        <Text style={[style.name, {color: theme.fontColorContent}]}>Dawid</Text>
                        <Avatar size={32} rounded source={{uri:'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?pid=ImgDet&rs=1'}}/>
                    </TouchableOpacity>
                </View>
        
                <View style={style.content}>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Profile', {state: user}), dispatch(setNavigation(SCREEN_WIDTH+100)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>My profile</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.link}>
                        <Text style={[style.linkText, {color: theme.fontColor}]}>Groups</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Create', {state: user}), dispatch(setNavigation(SCREEN_WIDTH+100)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>Add project</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Chats', {state: user}), dispatch(setNavigation(SCREEN_WIDTH+100)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>Chats</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>           
                </View>
            </View>

                <View style={style.bottomContent}>
                    <TouchableOpacity style={style.link}  onPress={() => (navigation.navigate('Settings'), dispatch(setNavigation(SCREEN_WIDTH+100)))} >
                        <Text style={[style.linkText, {color: theme.fontColor}]}>Settings</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.link}>
                        <Text style={[style.linkText, {color: '#2b3'}]}>Add reviews</Text>
                        <Icon type='materialicon' name="arrow-forward-ios" size={20} color={theme.fontColorContent}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> (logout(), dispatch(setNavigation(SCREEN_WIDTH+100)))}  style={[style.logoutButton, {backgroundColor: theme.backgroundContent}]}>
                        <Text style={[{color:theme.fontColorContent, marginRight:13}]}>Logout</Text>
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
  </>
  )
}

const style = StyleSheet.create({
    containerNavigation: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT+50, //nie wiem dlaczego 50 xD       
        position:'absolute',
        top:0,
        zIndex:11
    },
    backgroundNavigation: {
        backgroundColor: 'rgba(1, 1, 1, .5)',
        width:SCREEN_WIDTH+200,
        height:SCREEN_HEIGHT+50,
        position:'absolute',
        top:0,
        zIndex:10
    },
    header: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:20,
        marginTop:30,
        justifyContent:'space-between'
    },
    profileButton:{
        flexDirection: 'row',
        alignItems:'center'
    },
    name: {
        marginRight:15,
        fontSize:18,
        color:'#293',
        fontWeight:'bold'
    },
    content: {
        alignSelf:'flex-start',
        paddingHorizontal:20,
        // alignItems:'center',
        width:SCREEN_WIDTH-125,
    },
    link: {
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
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
        width:SCREEN_WIDTH-125,
    },
    logoutButton: {
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'flex-end',
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:15,
        borderRadius:35
    }
})
