import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Dimensions, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { style } from './style';
import useAuth from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';
import _Icon from 'react-native-vector-icons/Ionicons'

import { setNavigation } from '../../slices/navigationSlice';
import { useProjects } from '../../hooks/useProjects';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  const _translations = translations.screens.HomeScreen.textInput
  const navigation:any = useNavigation()
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()
  const { projects, loading }  = useProjects(user)
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TextInput placeholder={language==="en"?_translations.en:_translations.pl} placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      headerLeft: () => <Image style={style.logo} source={require('../../assets/cars_projects_IconV2.png')}/>,

      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity style={style.iconPadding} 
          onPress={() => dispatch(setNavigation(true))}
        >
          <_Icon name={'menu-outline'} size={26 } color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>
    })
  }, [theme])


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      navigation.navigate('Chats')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  return (
    <View style={{flex:1, position:'relative',alignItems:'center', justifyContent:'center', backgroundColor:theme.background}}>
      {loading&&<LoadingView headerText={'Loading projects'}/>}
      {projects.length>0?<FlatList 
        style={{ width: '100%'}}
        contentContainerStyle={{flexGrow:1}}
        data={projects}
        // pagingEnabled
        
        bounces
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> 
        <Carproject data={carData.item}/>
      }
      />:<View>
          <Text style={[{color: theme.fontColorContent}]}>No projects...</Text>
        </View>}

        <TouchableOpacity  onPress={async () => {
          await schedulePushNotification();
        }}>
          <Text style={{color:theme.fontColor}}>click</Text>
        </TouchableOpacity>
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