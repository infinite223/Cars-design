import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CarprojectData } from '../utils/types'
import { useNavigation } from '@react-navigation/native'
import { selectTheme } from './../slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProject } from '../slices/selectedProject';
import * as Clipboard from 'expo-clipboard';
import { getColorsCircle } from './../utils/functions/colorsCircle';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Icon } from '@rneui/base';
import { likeProject, onShare } from '../utils/functions/projectFunctions';
import { translations } from '../utils/translations';
import { selectLanguage } from './../slices/languageSlice';
import useAuth from '../hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { setHideProjects } from '../slices/hideProjects';
import { toDateTime } from '../utils/toDateTime';
import { Timestamp } from 'firebase/firestore';
import { globalStyles } from '../utils/globalStyles';
import { getCorrectNameLikes } from '../utils/functions/getCorrectNameLikes';

const Carproject:React.FC<{data:CarprojectData}> = ({data: {id, car, author, createdAt, place}}) => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const language = useSelector<string>(selectLanguage)
  const { _menuOptions: {capy, hide, save, report}, likesText} = translations.components.carProject

  const dispatch = useDispatch()
  const { user }:any = useAuth()
  const isMyProject = author.uid ===user.uid
  const setProjectToNav = () => {

    dispatch(setSelectedProject({
      id, car, author, createdAt:JSON.stringify(createdAt), place
    }))

    navigation.navigate('Project', {id, car, author, createdAt})
  }

  const copyToClipboard = async (carMake:string, model:string) => {
    await Clipboard.setStringAsync(carMake+' '+model);
  };


  const hideProject = (projectId:string) => {
      dispatch(setHideProjects(projectId))
  }

  const saveProject = (projectId:string) => {
    //....
  }
  const carLastStagePerformance = car.history[car.history.length-1].performance
  return (
      <View style={{backgroundColor: theme.background}}>
      {carLastStagePerformance&&
       <TouchableWithoutFeedback onPress={setProjectToNav}>
        <View style={[style.projectContainer]}>
          <View style={{ flexDirection:'column', alignItems:'flex-start', marginBottom:10}}>
            <Text style={{fontSize:17, marginRight:10, color: getColorsCircle(carLastStagePerformance[0].value, carLastStagePerformance[0].type)[0]}}>{car.model}</Text>
            <Text style={{fontSize:12, color:theme.fontColor}}>{car.CarMake} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <LinearGradient
              colors={getColorsCircle(carLastStagePerformance[0].value, carLastStagePerformance[0].type)}
              style={style.stageContainer}
              start={{x:0, y:0}}
              end={{x:1, y:2}}
            >
              <Text style={[style.stageText, {color: theme.fontColor}]}>
                {car.history.length===0?'STOCK':car.history[car.history.length-1].name.toUpperCase()}
              </Text>
            </LinearGradient>
            <View style={style.performanceContainer}>
              <Text style={[style.performanceValue, {color: getColorsCircle(carLastStagePerformance[0].value, carLastStagePerformance[0].type)[0]}]}>
                {carLastStagePerformance[0].value}
              </Text>
              <Text style={[style.performanceType, {color: theme.fontColor}]}>{carLastStagePerformance[0].type}</Text>
            </View>
            <View style={style.performanceContainer}>
              <Text style={[style.performanceValue, {color: getColorsCircle(carLastStagePerformance[1].value, carLastStagePerformance[1].type)[0]}]}>
                {carLastStagePerformance[1].value}
              </Text>
              <Text style={[style.performanceType, {color: theme.fontColor}]}>{carLastStagePerformance[1].type}</Text>
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
            {!isMyProject&&<TouchableOpacity
              onPress={()=>likeProject(id, author.uid, car.likes.find((like:any)=>like===user.uid)?true:false, {imageUri:user.imageUri, name:user.name, uid:user.uid})}
              style={[style.iconContainer]}>
              <Icon                 
                    name='heart-outlined'
                    type='entypo'
                    size={24} 
                    color={car.likes.find((like:any)=>like===user.uid)?globalStyles.background_2:theme.fontColor}
                />
            </TouchableOpacity>}
            <TouchableOpacity onPress={()=> onShare(car.CarMake, car.model, 'xd')} style={style.iconContainer}>
              <Icon                 
                    name='share'
                    type='entypo'
                    size={22} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>

            <Text style={[style.likes, {color: theme.fontColorContent}]}>
              {getCorrectNameLikes(car.likes?.length)} 
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
                  borderRadius:5,
                  borderWidth:1, 
                  borderColor: theme.backgroundContent,
                  backgroundColor: theme.background
                }, optionText: {color:theme.fontColor}
              }}>

              <MenuOption onSelect={() => copyToClipboard(car.CarMake, car.model)}  text={capy[language as keyof typeof report]} />
              <MenuOption onSelect={() => hideProject(id)}  text={hide[language as keyof typeof report]} />
              <MenuOption onSelect={() => saveProject(id)}  text={save[language as keyof typeof report]} />
              <MenuOption onSelect={() => navigation.navigate('Report', {id, type:'project'})} >
                <Text style={{color: '#ff7777'}}>{report[language as keyof typeof report]}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Text style={[style.dateCreate, {color: theme.fontColorContent}]}>
          {toDateTime(createdAt?.seconds).toDateString()}
        </Text>
        <View style={{borderBottomWidth:1, borderBottomColor:theme.backgroundContent, paddingVertical:5, opacity:.6}}></View>
      </View>
  )
}
 
export default Carproject

const style = StyleSheet.create({
  projectContainer: {
    paddingHorizontal:10, 
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
  stageContainer: {
    borderRadius:15,
    paddingHorizontal:8,
    paddingVertical:4,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  stageText: {
    fontSize:11,
    letterSpacing:1,
    fontWeight:'bold',
  },
  footer: {
    zIndex:4,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:8,
    paddingTop:10,
    paddingBottom:5
  },
  iconContainer: {
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:5,
  },
  likes: {
    marginHorizontal:8
  },
  dateCreate: {
    marginLeft:15,
    fontSize:10
  }
}) 