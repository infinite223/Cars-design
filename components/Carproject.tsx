import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { CarprojectData } from '../utils/types'
import { useNavigation, useRoute } from '@react-navigation/native'

const Carproject:React.FC<{data:CarprojectData}> = ({data: {id, car, author, createdAt}}) => {
  const navigation:any = useNavigation()

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Project', {id, car, author, createdAt}) }>
      <View>
        <View style={{marginVertical:3 ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{ flexDirection:'row', alignItems:'center'}}>
                <Image style={{margin:5, width:25, height:25, borderRadius:50}} source={{uri:author.imageUri}}/>
                <Text style={{fontSize:17, fontWeight:'500', margin:5}}>{car.CarMake} {car.model}</Text>
            </View>
            <Text style={{fontSize:14, margin:5}}>{createdAt}</Text>
        </View>

        <Image style={{height:250, width:"100%"}} source={{uri:car.imagesCar[0]}}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Carproject