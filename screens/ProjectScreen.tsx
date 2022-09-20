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
    const navigationTabs: any = useNavigation()
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const route = useRoute<any>()
    const {id, car, author, createdAt } = route.params;

    const Tab = createNativeStackNavigator();

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
    <View style={{flex:1}}>
      <ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={author}/>
      <ScrollView style={{backgroundColor:'white'}} contentContainerStyle={{flex:1}}>
        <View style={{marginHorizontal:15}}>
          <Text style={{color:'#333', maxWidth:'80%', fontSize:12}}>{car.description}</Text>
          <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
              <MaterialIcons name='place' color="#444" size={20} style={{marginRight:3}}/>
              <Text style={{fontSize:17, fontWeight:'600', letterSpacing:1}}>{author.place}</Text>
          </View>

          <FlatList
            horizontal
            style={{marginTop:8}}
            showsHorizontalScrollIndicator={false}
            data={car.performance}
            renderItem={({item})=> (
              <CircleData type={item.type} number={item.value} colors={getColorsCircle(item.value, item.type)}/>
            )}
          />
        </View>
            <Tab.Navigator  
              screenOptions={{
                headerShown:false 
              }}>
              <Tab.Screen name="Photos" component={PhotosTab}/>
              <Tab.Screen name="History" component={HistoryTab}/>
            </Tab.Navigator>
        </ScrollView>
      <View style={{backgroundColor:'white', width:'100%', position:'relative', paddingHorizontal:10, paddingVertical:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
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