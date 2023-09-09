import { View, TouchableOpacity, FlatList, Text, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from '../../utils/translations'; 
import { Icon } from '@rneui/themed';
import _Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getFirestore, onSnapshot, collection, orderBy, limit } from 'firebase/firestore';
import useAuth from './../../hooks/useAuth';
import { style } from './style'
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { setSelectedRoom } from '../../slices/selectedRoomSlice';
import { query } from 'firebase/firestore';
import { toDateTime } from '../../utils/toDateTime';
import { globalStyles } from '../../utils/globalStyles';

const widthScreen = Dimensions.get('screen').width


const MeetingScreen = () => {
  const { warningText } = translations.screens.MeetingScreen
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const [meetings, setMeetings] = useState<any>([])
  const language = useSelector(selectLanguage)
  const {user}:any = useAuth()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () =>     <View style={{alignItems:'center', flexDirection:'row'}}>
       <Image style={{width:35, height:35, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
       <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 7, fontWeight: '800'}}>Spotkania</Text>
     </View>,
      headerRight: () => 
      <TouchableOpacity style={{paddingHorizontal:20, paddingVertical:5}} onPress={() => navigation.navigate('CreateMeeting')}>
        <_Icon_MaterialCommunityIcons name={'account-multiple-plus-outline'} size={24} color={theme.fontColor} style={{ marginRight: 0 }}/>
      </TouchableOpacity>
    })  
  }, [theme])

  const db = getFirestore()

  useEffect(() => {
    const getMeetings = () => {
      const meetingsRef = collection(db, 'meetings')
      const meetingsQuery = query(meetingsRef, orderBy("date"), limit(10));

       onSnapshot(meetingsQuery, (snapchot) => {      
        setMeetings(snapchot.docs.map((doc, i)=> {
          return doc.data()
        }))      
      })
    }
    
    getMeetings()
  }, [])
  

  
  return (
    <View style={{flex:1, justifyContent:'flex-start', backgroundColor:theme.background}}>   
      {/* <View style={style.roomsContainer}>
        {meetings?
            <FlatList
                ItemSeparatorComponent={()=><View style={{height:10}}/>}
                contentContainerStyle={{ width:widthScreen}}
                data={meetings.filter((meeting:any)=> meeting.date < new Date())}
                renderItem={({item}) => {
                    return (                        
                   <TouchableOpacity activeOpacity={.5} onPress={()=> (navigation.navigate('MeetingRoom', item), dispatch(setSelectedRoom(item)))}>
                        <View style={style.dateContainer}>
                            <Icon type='entypo' name="clock" size={14} color={theme.fontColor}/>
                            <Text style={{color:theme.fontColor, marginLeft:7}}>{toDateTime(item.date.seconds).toDateString()}</Text>
                        </View>
                        <View style={[style.meetingRoom, {backgroundColor: theme.backgroundContent}]}>
                            <MapView          
                                scrollEnabled={false}          
                                style={style.miniMap}
                                initialRegion={{
                                    latitude: item.place.latitude,
                                    longitude: item.place.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}                  
                            />
                            <View style={{flex:1, marginHorizontal: 10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>                
                                <View style={style.textContainer}>
                                    <Text style={[style.nameText, {color: 'white'}]}>{item.name}</Text>
                                    <Text style={[style.placeText, {color: globalStyles.background_2}]}>
                                      {item.place.city.length<15?item.place.city:item.place.city.substring(0, 15)}
                                    </Text>
                                </View>  
                                <View style={[style.countPeople, {borderColor: theme.fontColorContent}]}>
                                    <Text style={[{color: theme.fontColor, marginRight:8, fontSize:15, fontWeight:'bold'}]}>{item.people.length}</Text>
                                    <Icon type='ionicon' name="people-outline" size={18} color={theme.fontColor}/>
                                </View>        
                            </View>                                 
                            <Icon style={{alignSelf:'center', marginRight:10}} type='materialicon' name="arrow-forward-ios" size={14} color={theme.fontColor}/> 
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />:
            <Text style={[style.warningText]}>
                {warningText[language as keyof typeof warningText]}
            </Text>
        }
      </View> */}
    </View>
  )
}
  
export default MeetingScreen