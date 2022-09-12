import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd, EvilIcons } from 'react-native-vector-icons';
import { CircleData } from '../components/CircleData';
import { Car } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../components/Tabs/PhotosTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryTab from '../components/Tabs/HistoryTab';


const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const { car, author, createdAt } = route.params;

    const Tab = createMaterialTopTabNavigator();

    console.log(author)

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
        //          //lajki tutaj dodać, serduszka klikalne
        //         </TouchableOpacity>    
        })  
      }, [])

      
    const CustomTabButton = (props:any) => (
      <TouchableOpacity
        {...props}
        style={
          props.accessibilityState.selected
            ? [props.style, { borderTopColor: 'red', borderTopWidth: 2 }]
            : props.style
        }
      />
    );
    
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

      <View style={{marginHorizontal:-15, flex:1, flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
        <Tab.Navigator       
          screenOptions={{
            tabBarStyle: { backgroundColor: 'white'},
            tabBarIndicatorStyle: {
              backgroundColor:'gray',
              borderTopWidth:1,
              borderTopColor:'#D3D3D3',
            }
        }}>
          <Tab.Screen name="Photos" component={PhotosTab}/>
          <Tab.Screen name="History" component={HistoryTab} />
        </Tab.Navigator>
      </View>

      <View style={{paddingHorizontal:10, paddingVertical:10, marginHorizontal:-15 , flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity><EvilIcons name='heart' size={30} color="black"/></TouchableOpacity>
            <Text style={{marginLeft:2}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar
            size={34}
            rounded
            source={{uri:author.imageUri}}    
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={{fontSize:15, fontWeight:'600'}}>Author</Text> */}
    </View>
  )
}

export default ProjectScreen