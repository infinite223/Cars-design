import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native'
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
import _Icon_Feather from 'react-native-vector-icons/Feather'
import _Icon_Fontisto from 'react-native-vector-icons/Fontisto'
import _Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ChatModal from './../modals/ChatModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import MapModal from './../modals/MapModal';
import { style } from './style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InfoTab from '../../components/ProjectScreenTabs/InfoTab';
import useAuth from '../../hooks/useAuth';

const widthScreen = Dimensions.get('window').width

const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const navigationTabs: any = useNavigation()
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const [mapModalVisible, setMapModalVisible] = useState(false)
    const theme = useSelector(selectTheme)
    const route = useRoute<any>()
    const {id, car, author, createdAt } = route.params;
    const baseColor = getColorsCircle(car.performance[0].value, car.performance[0].type)[0]
    
    const Tab = createMaterialTopTabNavigator();
    const { user }:any = useAuth()



    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{ fontSize:21, color:theme.fontColor}}>{car.CarMake} 
           <Text style={{color: baseColor}}> {car.model}</Text>
           </Text>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          ),
          // headerRight: () => 
              // <Image style={{width:40, height:40, marginVertical:10}} source={require('../../assets/cars_projects_IconV2.png')}/>

        })  
      }, [theme])

  return (
    <View style={{flex:1}}>
      {/* <ChatModal modalVisible={chatModalVisible} setModalVisible={setChatModalVisible} author={author}/> */}
            <Tab.Navigator  
              screenOptions={{
                // headerShown:false 
                tabBarStyle: {backgroundColor: theme.background},
                tabBarShowLabel:false,      
                tabBarIndicatorStyle: {
                    backgroundColor: baseColor?baseColor:'#273',
                },
              }}>
              <Tab.Screen name="Info" component={InfoTab} 
                options={{tabBarIcon: ({focused}) => <_Icon_Feather name='info' size={22} color={focused?theme.fontColor:theme.fontColorContent} />}}
              />
              <Tab.Screen name="Photos" component={PhotosTab}
                options={{tabBarIcon: ({focused}) => <_Icon_Fontisto name='photograph' size={22} color={focused?theme.fontColor:theme.fontColorContent} />}}
              />
              <Tab.Screen name="History" component={HistoryTab}
                options={{tabBarIcon: ({focused}) => <_Icon_MaterialIcons name='timeline' size={22} color={focused?theme.fontColor:theme.fontColorContent} />}}
              />
            </Tab.Navigator>
      <View style={[style.bottomNav, {backgroundColor:theme.background}]}>
        <View>
          <View style={style.iconsContainer}>
            <TouchableOpacity onPress={()=> setChatModalVisible(true)} style={style.iconPadding}>
              <Icon type='feather' name='send' size={22} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShare(car.carMake, car.model, '')} style={style.iconPadding}>
              <Icon type="evilicon" name='share-google' size={30} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>likeProject(id)} style={style.iconPadding}>         
              <Icon type="evilicon" name='heart' size={32} color={theme.fontColor}/>
            </TouchableOpacity>
            <Text style={{marginLeft:6, color:theme.fontColor}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={style.iconsContainer}>
          <Text style={{marginRight:8,  color:theme.fontColor}}>{user.name}</Text>
          <Avatar
            size={32}
            rounded
            source={{uri:user.imageUri}}    
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProjectScreen

