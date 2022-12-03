import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native'
import React, { useState } from 'react'
import { CarprojectData } from '../utils/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectTheme } from './../slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProject } from '../slices/selectedProject';
import { LoadingView } from './LoadingView';
import { getColorsCircle } from './../utils/functions/colorsCircle';

const Carproject:React.FC<{data:CarprojectData}> = ({data: {id, car, author, createdAt}}) => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)

  const [loadingProjects, setLoadingProjects] = useState(false)

  const dispatch = useDispatch()

  const setProjectToNav = () => {

    dispatch(setSelectedProject({
      id, car, author, createdAt
    }))

    navigation.navigate('Project', {id, car, author, createdAt})
  }


  return (
    <TouchableWithoutFeedback onPress={setProjectToNav} style={{flex:1}}>
      <View style={{backgroundColor: theme.background}}>
      {car.performance&&
        <View style={[style.projectContainer]}>
          <View style={{ flexDirection:'column', alignItems:'flex-start', marginBottom:10}}>
            <Text style={{fontSize:24, marginRight:10, color: getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}}>{car.model}</Text>
            <Text style={{color:theme.fontColor}}>{car.CarMake} </Text>
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
      }
        <Image style={{height:250, width:"100%", zIndex:2}} source={{uri:car.imagesCar[0].url}}/>
        <View style={style.footer}>

        </View>
        <View style={StyleSheet.absoluteFillObject}>
          <Image 
            source={{uri: car.imagesCar[0].url}}
            style={[
              StyleSheet.absoluteFillObject,
              {opacity: .7, zIndex:1}
            ]}
            blurRadius={50}
          />
        </View>
      </View>
     
    </TouchableWithoutFeedback>
  )
}
 
export default Carproject

const style = StyleSheet.create({
  projectContainer: {
    // flex:1,
    marginVertical:5, 
    paddingHorizontal:10, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    zIndex:2
  },
  performanceContainer: {
    // flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10,
    justifyContent:'center'
  },
  performanceValue: {
    fontSize:16,
  },
  performanceType: {
    fontSize:12,
  },
  stageText: {
    marginRight:10,
    alignSelf:'center',
    fontSize:14,
    letterSpacing:1,
    fontWeight:'bold',
    borderRadius:15,
    paddingHorizontal:10,
    paddingVertical:3
  },
  footer: {
    height:50,
    width:'100%'
  }
}) 