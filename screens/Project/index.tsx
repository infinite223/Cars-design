import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from '@rneui/base';
import { CircleData } from '../../components/CircleData';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../../components/ProjectScreenTabs/PhotosTab';
import HistoryTab from '../../components/ProjectScreenTabs/HistoryTab';
import { getColorsCircle } from './../../utils/functions/colorsCircle';
import { onShare, likeProject } from '../../utils/functions/projectFunctions';
import ChatModal from './../modals/ChatModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import MapModal from './../modals/MapModal';
import { style } from './style';


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
               <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:5}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          ),
          headerRight: () => 
              <Image style={{width:40, height:40, marginVertical:10}} source={require('../../assets/cars_projects_IconV2.png')}/>

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
              <Icon type="materialicon" name='place' color={theme.fontColor} size={20} style={{marginRight:5}}/>
              <Text style={[style.locationPlace, {color:theme.fontColor}]}>{author.place.city}</Text>
            </View>
          </TouchableOpacity>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight:8}}
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
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
            <TouchableOpacity onPress={()=> setChatModalVisible(true)} style={{marginRight:6}}>
              <Icon type='feather' name='send' size={26} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={{marginRight:6}}>
              <Icon type="evilicon" name='share-google' size={34} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>likeProject(id)}>         
              <Icon type="evilicon" name='heart' size={36} color={theme.fontColor}/>
            </TouchableOpacity>
            <Text style={{marginLeft:6, color:theme.fontColor}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={style.iconsContainer}>
          <Text style={{marginRight:14,  color:theme.fontColor}}>{author.name}</Text>
          <Avatar
            size={39}
            rounded
            source={{uri:author.imageUri}}    
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProjectScreen

