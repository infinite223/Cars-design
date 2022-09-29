import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Share, FlatList } from 'react-native'
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
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import ImagesModal from './modals/ImagesModal';
import MapModal from './modals/MapModal';


const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const navigationTabs: any = useNavigation()
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const [mapModalVisible, setMapModalVisible] = useState(false)
    const theme = useSelector(selectTheme)
    const route = useRoute<any>()
    const {id, car, author, createdAt } = route.params;

    const Tab = createNativeStackNavigator();

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:21, color:theme.fontColor}}>{car.CarMake} 
           <Text style={{color: getColorsCircle(car.performance[0].value, car.performance[0].type)[0]}}> {car.model}</Text>
           </Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={20} color={theme.fontColor}/>
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => 
                <Text style={{fontSize:11, color:'gray'}}>{createdAt}</Text>
        })  
      }, [theme])

  return (
    <View style={{flex:1}}>
      <ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={author}/>
      <MapModal modalVisible={mapModalVisible} setModalVisible={setMapModalVisible}/>
      <ScrollView style={{backgroundColor:theme.background}} contentContainerStyle={{flex:1}}>
        <View style={{marginHorizontal:15}}>
          <Text style={[style.descriptopnText, {color:theme.fontColorContent}]}>{car.description}</Text>
          <TouchableOpacity onPress={()=>setMapModalVisible(true)}>
            <View style={style.locationContainer}>
              <MaterialIcons name='place' color={theme.fontColor} size={20} style={{marginRight:5}}/>
              <Text style={[style.locationPlace, {color:theme.fontColor}]}>{author.place}</Text>
            </View>
          </TouchableOpacity>

          <FlatList
            horizontal
            style={{marginTop:8, marginRight:-15}}
            showsHorizontalScrollIndicator={false}
            snapToInterval={105}
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
      <View style={[style.bottomNav, {backgroundColor:theme.background}]}>
        <View>
          <View style={style.iconsContainer}>
            <TouchableOpacity onPress={()=> setChatModalVisible(true)} style={{marginRight:6}}><Feather name='send' size={23} color={theme.fontColor}/></TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={{marginRight:6}}><EvilIcons name='share-google' size={30} color={theme.fontColor}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>likeProject(id)}><EvilIcons name='heart' size={32} color={theme.fontColor}/></TouchableOpacity>
            <Text style={{marginLeft:6, color:theme.fontColor}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={style.iconsContainer}>
          <Text style={{marginRight:10,  color:theme.fontColor}}>{author.name}</Text>
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

const style = StyleSheet.create({
  descriptopnText: {
    maxWidth:'80%',
    fontSize:12
  },
  locationContainer: {
    flexDirection:'row', 
    alignItems:'center',
    marginVertical:5
  },
  locationPlace: {
    fontSize:17, 
    fontWeight:'600', 
    letterSpacing:1,
  },
  bottomNav: {
    width:'100%', 
    position:'relative', 
    paddingHorizontal:10, 
    paddingVertical:8, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  iconsContainer: {
    flexDirection:'row', 
    alignItems:'center'
  }
})