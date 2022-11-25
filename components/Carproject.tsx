import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { CarprojectData } from '../utils/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectTheme } from './../slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProject } from '../slices/selectedProject';
import { LoadingView } from './LoadingView';

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
    <TouchableWithoutFeedback onPress={setProjectToNav} style={{position:'relative'}}>
      <View>
        <View style={{backgroundColor:theme.background, marginVertical:5, paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{ flexDirection:'row', alignItems:'center'}}>
                <Image style={{margin:5, width:25, height:25, borderRadius:50}} source={{uri:author.imageUri}}/>
                <Text style={{fontSize:17, fontWeight:'500',color:theme.fontColor, margin:5}}>{car.CarMake} {car.model}</Text>
            </View>
            <Text style={{fontSize:12, margin:5, color:theme.fontColor}}>{createdAt}</Text>
        </View>
        {/* {loadingProjects&&<LoadingView />} */}
        <Image style={{height:250, width:"100%"}} source={{uri:car.imagesCar[0].url}}/>
      </View>
    </TouchableWithoutFeedback>
  )
}
 
export default Carproject