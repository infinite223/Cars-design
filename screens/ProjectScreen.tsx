import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd } from 'react-native-vector-icons';
import { CircleData } from '../components/CircleData';
import { Car } from '../utils/types';

const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const { car, author, createdAt } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:21}}>{car.CarMake} {car.model}</Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={24} />
                </TouchableOpacity>
            </View>
          ),
        //   headerRight: () => 
        //         <TouchableOpacity onPress={()=> logout()}>
        //             <Text style={{fontSize:15}}>Log Out</Text>    
        //         </TouchableOpacity>    
        })  
      }, [])
    
  return (
    <View style={{flex:1, backgroundColor:'white', marginHorizontal:15}}>
      <Text style={{fontSize:15, fontWeight:'600'}}>Description</Text>
      <Text style={{color:'#333'}}>{car.description}</Text>

      <Text style={{fontSize:15, fontWeight:'600', marginVertical:10}}>Performance</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <CircleData type="HP" number={car.hp} color="red"/>
        <CircleData type="Nm" number={car.nm} color="#339"/>
        <CircleData type="0-100km/h" number={car.performance[0]} color="#935"/>
      </View>

      <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', marginVertical:20}}>
        <Text style={{fontSize:15, fontWeight:'600'}}>Photos</Text>
        <Text style={{fontSize:15, fontWeight:'600', marginVertical:10}}>History</Text>
      </View>
      <Text style={{fontSize:15, fontWeight:'600'}}>Author</Text>
    </View>
  )
}

export default ProjectScreen