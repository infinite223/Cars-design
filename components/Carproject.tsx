import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useState } from 'react'
import { CarprojectData } from '../utils/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectTheme } from './../slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProject } from '../slices/selectedProject';
import { LoadingView } from './LoadingView';
import * as Clipboard from 'expo-clipboard';
import { getColorsCircle } from './../utils/functions/colorsCircle';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Icon } from '@rneui/base';
import { onShare } from '../utils/functions/projectFunctions';
import { translations } from '../utils/translations';
import { selectLanguage } from './../slices/languageSlice';
import { doc, setDoc } from 'firebase/firestore';
import useAuth, { db } from '../hooks/useAuth';
import { v4 as uuid } from 'uuid';

const Carproject:React.FC<{data:CarprojectData}> = ({data: {id, car, authorUid, createdAt}}) => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const language = useSelector<string>(selectLanguage)
  const { _menuOptions: {capy, hide, save, report}, likesText} = translations.components.carProject

  const dispatch = useDispatch()
  const { user }:any = useAuth()

  const setProjectToNav = () => {

    dispatch(setSelectedProject({
      id, car, authorUid, createdAt
    }))

    navigation.navigate('Project', {id, car, authorUid, createdAt})
  }

  const copyToClipboard = async (carMake:string, model:string) => {
    await Clipboard.setStringAsync(carMake+' '+model);
  };

  const goToChat = () => {
    const chatId = uuid();
      const messageRef = doc(db, `chats/${chatId}`);

      setDoc(messageRef, {
       from:{
        uid: user.uid,
        imageUri: user.imageUri,
        name:user.name
       },
       to: {
        uid: 'SxS1gZ5urRWQ66jLCFWCKQRhiP43',
        imageUri: 'https://firebasestorage.googleapis.com/v0/b/cars-projects-317ef.appspot.com/o/SxS1gZ5urRWQ66jLCFWCKQRhiP43%2Fprofile-%2F4ae2ec51-5082-4450-b12d-9d06a008b757.jpeg?alt=media&token=7d41e36e-26c3-4ae8-aed5-d46d586c1200',
        name: 'Adam'
       }
      })

      navigation.navigate('Chat',  {
        uid: authorUid,
        imageUri: 'https://firebasestorage.googleapis.com/v0/b/cars-projects-317ef.appspot.com/o/jR10GOJtyPXT9fRTKuEjHbhvsz23%2Fprofile%2F3401f3eb-14e6-488b-8872-a90fde47d044.jpeg?alt=media&token=8680beff-fce5-4f13-babf-72fddfaec0f3',
        name: 'Dawid',
        id:chatId
      })
  }

  return (
      <View style={{backgroundColor: theme.background}}>
      {car.performance&&
       <TouchableWithoutFeedback onPress={setProjectToNav}>
        <View style={[style.projectContainer]}>
          <View style={{ flexDirection:'column', alignItems:'flex-start', marginBottom:10}}>
            <Text style={{fontSize:20, marginRight:10, color: getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}}>{car.model}</Text>
            <Text style={{fontSize:12, color:theme.fontColor}}>{car.CarMake} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={[style.stageText, {color: theme.background,  backgroundColor:getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}]}>
              STAGE {car.history.length}
            </Text>
            <View style={style.performanceContainer}>
              <Text style={[style.performanceValue, {color: getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}]}>
                {car.performance[0].value}
              </Text>
              <Text style={[style.performanceType, {color: theme.fontColor}]}>{car.performance[0].type}</Text>
            </View>
            <View style={style.performanceContainer}>
              <Text style={[style.performanceValue, {color: getColorsCircle(car.performance[1].value, car.performance[1].type)[0]}]}>
                {car.performance[1].value}
              </Text>
              <Text style={[style.performanceType, {color: theme.fontColor}]}>{car.performance[1].type}</Text>
            </View>
          </View>   
        </View>
       </TouchableWithoutFeedback>
      }

      <View style={style.imageContainer}>
        <TouchableWithoutFeedback onPress={setProjectToNav}>
        <Image style={{height:250, width:"100%", zIndex:2}} source={{uri:car.imagesCar[0].url}}/>
        </TouchableWithoutFeedback>
      </View>
 
        <View style={style.footer}>
          <View style={{alignItems:'center', flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> console.log('xddd')} style={style.iconContainer}>
              <Icon                 
                    name='heart-outlined'
                    type='entypo'
                    size={24} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onShare(car.CarMake, car.model, 'lubie Cie')} style={style.iconContainer}>
              <Icon                 
                    name='share'
                    type='entypo'
                    size={22} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>

            <Text style={[style.likes, {color: theme.fontColorContent}]}>
              {car.likes} {likesText[language as keyof typeof likesText]}
            </Text>
          </View>
          <Menu>
            <MenuTrigger>
              <Text>
                <Icon                 
                  name='dots-three-vertical'
                  type='entypo'
                  size={16} 
                  color={theme.fontColor}
                />
              </Text>
            </MenuTrigger>
            <MenuOptions 
              customStyles={{optionsContainer: 
                {
                  paddingHorizontal:10,
                  paddingVertical:5,
                  borderRadius:10,
                  borderWidth:1, 
                  borderColor: theme.backgroundContent,
                  backgroundColor: theme.background
                }, optionText: {color:theme.fontColor}
              }}>
              <MenuOption onSelect={() => alert(`Report`)} >
                <Text style={{color: 'red'}}>{report[language as keyof typeof report]}</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text={hide[language as keyof typeof report]}/>
              <MenuOption onSelect={() => copyToClipboard(car.CarMake, car.model)}  text={capy[language as keyof typeof report]} />
              <MenuOption onSelect={() => {}} disabled={true} text={hide[language as keyof typeof report]} />
              <MenuOption onSelect={() => goToChat()} text="Messgae" />
            </MenuOptions>
          </Menu>
        </View>
        <View style={StyleSheet.absoluteFillObject}>
          <Image 
            source={{uri: car.imagesCar[0].url}}
            style={[
              StyleSheet.absoluteFillObject,
              {opacity: .1, zIndex:1}
            ]}
            blurRadius={50}
          />
        </View>
      </View>
  )
}
 
export default Carproject

const style = StyleSheet.create({
  projectContainer: {
    marginVertical:5, 
    paddingHorizontal:20, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    zIndex:2
  },
  performanceContainer: {
    alignItems:'center',
    marginLeft:15,
    justifyContent:'center'
  },
  performanceValue: {
    fontSize:14,
  },
  performanceType: {
    fontSize:12,
  },
  imageContainer: {
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:0
  },
  stageText: {
    marginRight:10,
    alignSelf:'center',
    fontSize:12,
    letterSpacing:1,
    fontWeight:'bold',
    borderRadius:15,
    paddingHorizontal:10,
    paddingVertical:3
  },
  footer: {
    zIndex:4,
    height:50,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:12
  },
  iconContainer: {
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:5,
    paddingVertical:5
  },
  likes: {
    marginHorizontal:8
  }
}) 