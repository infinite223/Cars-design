import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Share, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd, EvilIcons, AntDesign, Feather, Ionicons } from 'react-native-vector-icons';
import { CircleData } from '../components/CircleData';
import { Car } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../components/Tabs/PhotosTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryTab from '../components/Tabs/HistoryTab';
import { LinearGradient } from 'expo-linear-gradient';
import { getColorsCircle } from './../utils/functions/colorsCircle';
import { onShare, likeProject } from '../utils/functions/projectFunctions';
import ChatModal from './modals/ChatModal';


const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const route = useRoute<any>()
    const {id, car, author, createdAt } = route.params;

    const Tab = createMaterialTopTabNavigator();
    console.log(car.imagesCar.length)

    console.log(author)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:21}}>{car.CarMake} {car.model}</Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={22} />
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => 
                <Text style={{fontSize:11, color:'gray'}}>{createdAt}</Text>
        })  
      }, [])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={author}/>
      <ScrollView style={{backgroundColor:'white'}} >
        <View style={{marginHorizontal:15}}>
          <Text style={{color:'#333'}}>{car.description}</Text>
          <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
              <MaterialIcons name='place' color="#444" size={20} style={{marginRight:3}}/>
              <Text style={{fontSize:17, fontWeight:'600'}}>{author.place}</Text>
          </View>

          <ScrollView horizontal contentContainerStyle={{marginTop: 5, paddingVertical:10, flexDirection:'row', justifyContent:'space-between'}}>
            <CircleData type="HP" number={car.performance.hp} colors={getColorsCircle(car.performance.hp, "hp")}/>
            <CircleData type="Nm" number={car.performance.nm} colors={getColorsCircle(car.performance.nm, "nm")}/>
            <CircleData type="0-100km/h" number={car.performance._0_100} colors={getColorsCircle(car.performance._0_100, "_0_100")}/>
            <CircleData type="100-200km/h" number={car.performance._100_200} colors={getColorsCircle(car.performance._100_200, "_100_200")}/>
          </ScrollView>
        </View>

          <Tab.Navigator  
            style={{flex:1, height:550}}  
            screenOptions={{
              tabBarStyle: { backgroundColor: 'white'},     
              tabBarIndicatorStyle: {
                backgroundColor:'gray',
                borderTopWidth:0,
                borderTopColor:'#D3D3D3', 
                elevation:0
              },
              tabBarShowLabel:false,
              tabBarIndicatorContainerStyle: {
                width: 0, height: 0, elevation: 0,     
              },          
              tabBarPressColor:'pink'
          }}>
            <Tab.Screen name="Photos" component={PhotosTab}
              options={{
                tabBarIcon: ({ focused }) => { 
                  return <AntDesign name="picture" size={25} color={focused?"black":'gray'}/>
                },}}
            />
            <Tab.Screen name="History" component={HistoryTab}
              options={{
                tabBarIcon: ({ focused }) => { return <MaterialIcons name="timeline" size={25} color={focused?"black":'gray'}/>},
              }}
            />
          </Tab.Navigator>
        </ScrollView>
      <View style={{width:'100%', position:'relative', paddingHorizontal:10, paddingVertical:8, marginHorizontal:-15 , flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={()=> setChatModalVisible(true)} style={{marginRight:6}}><Feather name='send' size={23} color="gray"/></TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={{marginRight:6}}><EvilIcons name='share-google' size={30} color="black"/></TouchableOpacity>
            <TouchableOpacity onPress={()=>likeProject(id)}><EvilIcons name='heart' size={32} color="black"/></TouchableOpacity>
            <Text style={{marginLeft:6}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{marginRight:10}}>{author.name}</Text>
          <Avatar
            size={34}
            rounded
            source={{uri:author.imageUri}}    
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProjectScreen