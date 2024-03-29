import { View, Text, FlatList, Platform, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import useAuth from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';
import _Icon from 'react-native-vector-icons/Ionicons'
import { useProjects } from '../../hooks/useProjects';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'
import { selectHideProjects } from '../../slices/hideProjects';
import { useChats } from '../../hooks/useChats';
import { selectActiveChat } from '../../slices/chatsSlice';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const hideProjects = useSelector(selectHideProjects)
  const { user }:any = useAuth()
  const route = useRoute()
  const activeChat = useSelector(selectActiveChat)

  const { loadingChats } =  useChats(user, dispatch, 1, activeChat)

  const [limit, setLimit] = useState(2) 
  const { projects, loading, nextProjects}  = useProjects(user, limit)

  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () =>  
        <View style={{alignItems:'center', flexDirection:'row'}}>
          <Image style={{width:40, height:40, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
          <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 15, fontWeight: '800'}}>Projekty</Text>
        </View>,
       headerLeft: () => <View></View> ,
       headerRight: () => 
       <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{paddingLeft:5}}>
        <_Icon_antDesign name='search1' size={21} color={theme.fontColor} style={{marginRight: 15}}/>
       </TouchableOpacity>
    })  
  }, [theme])

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // useEffect(() => {
  //   if(route.name !=='Chat'){
  //     console.log(route)
  //     registerForPushNotificationsAsync().then(token => token&&setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response.notification.request.content.data.data, "res");
  //     navigation.navigate('Chat', response.notification.request.content.data.data)
  //   });
  //   console.log('e')

  //   if(route.name ==='Chat'){
  //     console.log('eaa')
  //   }

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  //   }
  // }, [route]);
  

  useEffect(() => {
    console.log(route.name)
    switch (route.name) {
      case 'Create':
        console.log('Create')
        StatusBar.pushStackEntry({ barStyle: 'light-content', backgroundColor:'red', hidden: false });
        break;
      case 'Home':
        console.log('Home')

        StatusBar.pushStackEntry({ barStyle: 'dark-content',backgroundColor:'black', hidden: false });
        break;
      default:
        StatusBar.pushStackEntry({ barStyle: 'dark-content',backgroundColor:'black', hidden: false });
    }
  }, [route, navigation]);

  return (
    <View 
      style={{paddingTop:0, flex:1, position:'relative',alignItems:'center', justifyContent:'center', backgroundColor:theme.background}}
    >
      <StatusBar backgroundColor={'black'}/>
      {loading&&<LoadingView headerText={'Loading projects'}/>}
      {projects?<FlatList 
        style={{ width: '100%'}}
        contentContainerStyle={{flexGrow:1, gap:5}}
        data={projects.filter((project)=> {
          if(hideProjects && !hideProjects.find((id:string) => id===project.id )){
            return project
          }
          else{
            null
          }
        })} 
        onEndReached={() => 
          nextProjects()
        }        
        bounces
        renderItem={(carData)=> 
        <Carproject data={carData.item}/>
      }
      />:<View>
          <Text style={[{color: theme.fontColorContent}]}>No projects...</Text>
        </View>}
    </View>
  )
}
  
export default HomeScreen


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New projcet car awailable!",
      body: 'Click to check project...',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}