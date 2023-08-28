import { View, Text, FlatList, Platform, SafeAreaView, StatusBar, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Carproject from '../../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import useAuth, { db } from './../../hooks/useAuth';
import { LoadingView } from './../../components/LoadingView';
import _Icon from 'react-native-vector-icons/Ionicons'
import { useProjects } from '../../hooks/useProjects';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { setChats } from '../../slices/chatsSlice';
import { selectHideProjects } from '../../slices/hideProjects';
import { toDateTime } from '../../utils/toDateTime';
import { useChats } from '../../hooks/useChats';


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
  const hideProjects = useSelector(selectHideProjects)
  const { user }:any = useAuth()
  const { loadingChats } =  useChats(user, dispatch, 1)

  const [limit, setLimit] = useState(2) 
  const { projects, loading, nextProjects}  = useProjects(user, limit)

  const items = [
    { name: "Edward", value: new Date(1995, 11, 17) },
    { name: "Sharpe", value:  new Date(1925, 11, 17) },
    { name: "And", value:  new Date(2095, 11, 17) },
    { name: "The", value:  new Date(1915, 11, 17) },
    { name: "Magnetic", value:  new Date(1999, 11, 17) },
    { name: "Zeros", value:  new Date(1995, 11, 19) },
  ];

  // projects?.sort((a, b) => toDateTime(b.createdAt).getTime() - toDateTime(a.createdAt).getTime())

  // useEffect(()=> {
  //   if(user.name!=='Tester'){
  //     const chatsRef = collection(db, "chats")
  //     //add query
  //     const chatsQuery = query(chatsRef, where("persons", "array-contains", user.uid),  orderBy('lastMessage.time', 'desc'))
  //     const unsubscribe = onSnapshot(chatsQuery, (snapchot) => {      
  //         dispatch(setChats(snapchot.docs.map((doc, i)=> {
  //               return doc.data()
  //           })))  
  //       })
      
  //     return unsubscribe
  //   }
  // }, [])


  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () =>  
        <View style={{alignItems:'center', flexDirection:'row'}}>
          <Image style={{width:35, height:35, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
          <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 5, fontWeight: '800'}}>Cars design</Text>
        </View>,
       headerLeft: () => <View></View> ,
       headerRight: () => <_Icon_antDesign name='search1' size={21} color={theme.fontColor} style={{marginRight: 15}}/>

    })  
  }, [theme])


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token&&setExpoPushToken(token));

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
    <SafeAreaView style={{paddingTop:0, flex:1, position:'relative',alignItems:'center', justifyContent:'center', backgroundColor:theme.background}}>
      {loading&&<LoadingView headerText={'Loading projects'}/>}
      {projects?<FlatList 
        style={{ width: '100%'}}
        contentContainerStyle={{flexGrow:1}}
        data={projects.filter((project)=> {
          if(hideProjects && !hideProjects.find((id:string) => id===project.id )){
            return project
          }
          else{
            null
          }
        })} 
        onEndReached={() => 
          // setLimit(prev => prev + 1)
          nextProjects()
        }        
        bounces
        // keyExtractor={(item) => item.id}
        renderItem={(carData)=> 
        <Carproject data={carData.item}/>
      }
      />:<View>
          <Text style={[{color: theme.fontColorContent}]}>No projects...</Text>
        </View>}

        {/* <TouchableOpacity  onPress={async () => {
          await schedulePushNotification();
        }}>
          <Text style={{color:theme.fontColor}}>click</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
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