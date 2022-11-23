import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Icon } from "@rneui/themed";
import _Icon from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { CarprojectData, User } from '../utils/types';
import useAuth from './../hooks/useAuth';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';
import { onShare } from './../utils/functions/projectFunctions';
import { FilterUsers } from './FilterUsers';


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

interface BottomOptionsProps {
    translateX?:any,
    isMyProfile: boolean,
    showUsersList: {show:boolean, users: User[] | null, headerText: string},
    setShowUsersList: (value:{show:boolean, users: User[], headerText: string}) =>void, 
}

export const UsersList:React.FC<BottomOptionsProps> = ({ translateX, isMyProfile, showUsersList, setShowUsersList}) => {
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user, logout }:any = useAuth()
    const [search, setSearch] = useState('')
    const [focuseOnSearch, setFocuseOnSearch] = useState(false)

    const translateY = useSharedValue(0)
    const rUsersListContentSheetStyle = useAnimatedStyle(() => {  
      return {       
        transform: [{translateY: translateY.value}]
      }
    })

    useEffect(() => {
      if(showUsersList.users && showUsersList.users.length>0) {
          translateY.value = withSpring( -SCREEN_HEIGHT/2.2, { damping: 50})
          translateX.value = withSpring(0, { damping: 100})
      }

    }, [showUsersList])
    const context = useSharedValue({y: 0})


    const gesture = Gesture.Pan()
    .onStart(()=> {
      context.value = { y: translateY.value }
    })
    
    .onUpdate((event)=> {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT/1)
      translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT/10 )

      if( translateY.value >-SCREEN_HEIGHT/1.4){
        translateY.value = withSpring( -SCREEN_HEIGHT/2.2, { damping: 50})
      }
    })
    .onEnd(()=> {
      if(translateY.value>-SCREEN_HEIGHT/2.6){
        translateY.value =  withSpring( -SCREEN_HEIGHT/12, { damping: 50})
        translateX.value = withSpring(-1200, { damping: 100})
      }
    })

    useEffect(() => {
     if(focuseOnSearch) translateY.value =  withSpring( -SCREEN_HEIGHT/1, { damping: 50})
    }, [focuseOnSearch])

    const unHide = () => {
      translateY.value =  withSpring( -SCREEN_HEIGHT/1.4, { damping: 50})
    }
    

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style.listContainer, rUsersListContentSheetStyle, {backgroundColor: theme.backgroundContent}]}>
        {/* <View style={{marginBottom:10, width:40, height:7, backgroundColor: theme.fontColorContent, borderRadius:15, alignSelf:'center'}}/> */}
            <Text style={{color:'#2b3', fontWeight:'bold', fontSize:16, alignSelf:'center'}}>
              {showUsersList.headerText}
            </Text>
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Icon type='evilicon' name='search' size={30} color={theme.fontColorContent}/>
                    <TextInput
                        style={{color: theme.fontColor, marginLeft:10}}
                        placeholder={`Search user`}
                        placeholderTextColor={theme.fontColorContent}
                        onChangeText={setSearch}
                        onTouchStart={()=>unHide()}
                    />
                </View>
            </View>

            <FilterUsers users={showUsersList.users} input={search} edit={isMyProfile} showOptions={showUsersList.show}/>   
        </Animated.View>       
      </GestureDetector>     
  )
}

const style = StyleSheet.create({
  listContainer: {
    marginHorizontal:-15,
    paddingHorizontal:15,
    paddingVertical:15,
    height: SCREEN_HEIGHT+20,
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: SCREEN_HEIGHT-100,
    borderRadius: 15,
    zIndex:10
  },
  renderItem:{ 
    borderRadius: 15,
    paddingHorizontal:10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50, 
    height: 50
  },
  searchContainer: {
    flexDirection:'row',
     justifyContent:'space-between',
     paddingLeft:10,
     paddingRight:7,
     borderRadius:10,
     paddingVertical:7,
     marginVertical:8
 },
}) 