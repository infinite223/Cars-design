import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { style } from './../screens/Profile/style';
import { Icon } from "@rneui/themed";
import _Icon from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { CarprojectData } from '../utils/types';
import useAuth from './../hooks/useAuth';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

interface BottomOptionsProps {
    translateX: number,
    isMyProfile: boolean,
    showOptions: {show:boolean, selectedProject: CarprojectData | null},
    setShowOptions: (value:{show:boolean, selectedProject: CarprojectData}) =>void, 
}

export const BottomOptions:React.FC<BottomOptionsProps> = ({translateX, isMyProfile, showOptions, setShowOptions}) => {
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user, logout }:any = useAuth()

    const { shareText, deleteText, editText, hideText, reportText } = translations.components.BottomOptions

    const translateY = useSharedValue(0)
    const rOptionsContentSheetStyle = useAnimatedStyle(() => {  
      return {       
        transform: [{translateY: translateY.value}]
      }
    })

    useEffect(() => {
      if(showOptions.selectedProject!==null) {
          translateY.value = withSpring( -SCREEN_HEIGHT/2.2, { damping: 50})
          translateX = withSpring(0)
      }

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
        translateX = withSpring(500)
      }
    })


  return (
    <GestureDetector gesture={gesture}>
                <Animated.View style={[style.optionsMenu, rOptionsContentSheetStyle, {backgroundColor: theme.backgroundContent}]}>
                    <View style={{marginBottom:10, width:40, height:7, backgroundColor: theme.fontColorContent, borderRadius:15, alignSelf:'center'}}/>
                    <Text style={{color:'#2b3', fontWeight:'bold', alignSelf:'center'}}>
                        {showOptions.selectedProject?.car.CarMake+' '} 
                        {showOptions.selectedProject?.car.model}
                    </Text>
                    {!isMyProfile?<>
                        <TouchableOpacity style={[style.optionContainer]}>
                            <Icon type='materialicon' name='edit' size={22} color={theme.fontColorContent}/>
                            <Text style={[style.optionText, {color: theme.fontColor}]}>
                                {language==='en'?editText.en:editText.pl}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.optionContainer]}>
                            <_Icon name='trash' size={20} color={theme.fontColorContent}/>
                            <Text style={[style.optionText, {color: theme.fontColor}]}>
                                {language==='en'?deleteText.en:deleteText.pl}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.optionContainer]}>
                            <_Icon name='eye-with-line' size={20} color={theme.fontColorContent}/>
                            {/* <_Icon name='eye' size={20} color={theme.fontColorContent}/> */}

                            <Text style={[style.optionText, {color: theme.fontColor}]}>
                                {language==='en'?hideText.en:hideText.pl}
                            </Text>
                        </TouchableOpacity>
                        </>:
                            <>
                            <TouchableOpacity style={[style.optionContainer]}>
                                <Icon type='materialicon' name='report' size={20} color={theme.fontColorContent}/>
                                <Text style={[style.optionText, {color: theme.fontColor}]}>
                                    {language==='en'?reportText.en:reportText.pl}
                                </Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[style.optionContainer]}>
                                <_Icon name='share' size={20} color={theme.fontColorContent}/>
                                <Text style={[style.optionText, {color: theme.fontColor}]}>
                                    {language==='en'?shareText.en:shareText.pl}
                                </Text>
                            </TouchableOpacity>
                            </>
                        }
                </Animated.View>       
            </GestureDetector>    
  )
}

