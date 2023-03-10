import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from '@rneui/base';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import PhotosTab from '../../components/ProjectScreenTabs/PhotosTab';
import HistoryTab from '../../components/ProjectScreenTabs/HistoryTab';
import { getColorsCircle } from './../../utils/functions/colorsCircle';
import { onShare, likeProject } from '../../utils/functions/projectFunctions';
import _Icon_Feather from 'react-native-vector-icons/Feather'
import _Icon_Fontisto from 'react-native-vector-icons/Fontisto'
import _Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InfoTab from '../../components/ProjectScreenTabs/InfoTab';
import useAuth from '../../hooks/useAuth';
import { UsersList } from '../../components/UsersList';
import { UserList } from '../../utils/types';
import { doc, onSnapshot, getDoc, collection } from 'firebase/firestore';
import { db } from './../../hooks/useAuth';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { selectChats } from './../../slices/chatsSlice';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const navigationTabs: any = useNavigation()
    const [mapModalVisible, setMapModalVisible] = useState(false)
    const [showUsersList, setShowUsersList] = useState<{
      show: boolean;
      users: string[] | null;
      headerText: string;
      type:string
  }>({show:false, users: [], type:'', headerText:''})
    const theme = useSelector(selectTheme)
    const chats:any = useSelector(selectChats)
    const route = useRoute<any>()
    const {id, car, author, createdAt } = route.params;
    const [likes, setLikes] = useState<string[]>(car.likes)

    const baseColor = getColorsCircle(car.performance[0].value, car.performance[0].type)[0]
    
    const Tab = createMaterialTopTabNavigator();
    const { user }:any = useAuth()

    const translateX = useSharedValue(-1200)
    const projectsRef = doc(db, `users/${author.uid}/projects`, id)


    const rAllContentSheetStyle = useAnimatedStyle(() => {  
      return {       
          transform: [{translateY: translateX.value}]
      }
    }) 

    useEffect(()=>{
      const unsubscribe = onSnapshot(projectsRef, (snapchot) => { 

        if(snapchot.data()){
          setLikes(snapchot.data()?.car.likes)     
        }
      })

       return unsubscribe
    }, [likeProject])
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

      const goToChat = () => {
        const findChat = chats.find((item:any)=>item.data.from.id === author.uid || item.data.to.id === author.uid)
        if(findChat){
          console.log('xddd')
          navigation.navigate('Chat', {id:findChat.id, block:findChat.block, new:false, data: {to: {id:author.uid, name: author.name, imageUri:author.imageUri}}})
        }
        else {
          const newChatId = uuid();
          navigation.navigate('Chat', {id:newChatId, new:true, data: {to: {id:author.uid, name: author.name, imageUri:author.imageUri}}})
        }
      }

  return (
    <View style={{flex:1}}>
      <Animated.View style={[rAllContentSheetStyle, {backgroundColor:`rgba(1, 1, 1, .5)`, zIndex:9, position:'absolute', width: widthScreen, height:heightScreen+100}]}/>
      <Tab.Navigator  
        screenOptions={{
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
            {user.uid!==author.uid&&
            <TouchableOpacity onPress={()=> goToChat()} style={style.iconPadding}>
              <Icon type='feather' name='send' size={22} color={theme.fontColor}/>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => onShare(car.carMake, car.model, '')} style={style.iconPadding}>
              <Icon type="evilicon" name='share-google' size={30} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onLongPress={()=>setShowUsersList({show:true, type:'likes', users:likes, headerText:"Users"})} 
              onPress={() =>likeProject(id, author.uid, likes.find((like:any)=>like===user.uid)?true:false, {imageUri:user.imageUri, name:user.name, uid:user.uid})} 
              style={style.iconPadding}
            >         
              <Icon type="evilicon" name='heart' size={32} color={likes.find((like:any)=>like===user.uid)?'#f33':theme.fontColor}/>
            </TouchableOpacity>
            <Text style={{marginLeft:6, color:theme.fontColor}}>
              {likes?.length}
            </Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {uid: author.uid, displayName:author.name})} style={style.iconsContainer}>
          <Text style={{marginRight:8,  color:theme.fontColor}}>{author.name}</Text>
          <Avatar
            size={32}
            rounded
            source={{uri:author.imageUri}}    
          />
        </TouchableOpacity>
      </View>
      <UsersList projectId={id} translateX={translateX} isMyProfile={user.uid===author.uid} showUsersList={showUsersList} setShowUsersList={setShowUsersList}/>
    </View>
  )
}

export default ProjectScreen

