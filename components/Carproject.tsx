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
      <View style={{height:'100%', backgroundColor: theme.background}}>
      <Image style={{height:250, width:"100%", zIndex:2}} source={{uri:car.imagesCar[0].url}}/>

        <View style={[style.projectContainer]}>
            <View style={{ flexDirection:'row', alignItems:'center'}}>
                {/* <Image style={{margin:5, width:25, height:25, borderRadius:50}} source={{uri:author.imageUri}}/> */}
                <View style={{ flexDirection:'row', alignItems:'center'}}>
                  <Text style={{fontSize:24, marginRight:10, color: getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}}>{car.model}</Text>
                  <Text style={{color:theme.fontColor}}>{car.CarMake} </Text>
                </View>
                {/* <Text style={{fontSize:17, fontWeight:'500',color:theme.fontColor, margin:5}}>{car.CarMake} {car.model}</Text> */}
            </View>
            {/* <Text style={{fontSize:12, margin:5, color:theme.fontColor}}>{createdAt}</Text> */}
        </View>
        {/* {loadingProjects&&<LoadingView />} */}
        <View style={StyleSheet.absoluteFillObject}>
          <Image 
            source={{uri: car.imagesCar[0].url}}
            style={[
              StyleSheet.absoluteFillObject,
              {opacity: .6, zIndex:1}
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
  }
}) 