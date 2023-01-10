import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/themed';
import CustomInput from '../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { style } from './style';
import SelectPlaceOnMap from './../modals/SelectPlaceOnMap';
import useAuth, { db } from '../../hooks/useAuth';
import { MeetingRoom } from '../../utils/types';
import MapView from 'react-native-maps';
import { v4 as uuid } from 'uuid';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import AlertModal from '../modals/AlertModal';
import { setLoading } from '../../slices/loadingSlice';


const CreateMeeting = () => {
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user }:any = useAuth()

    const {message: {successText, errorText, errorText2}, nameMeeting, dateText, locationText, createText } = translations.screens.CreateMeeting
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date());
    const [nummberMeetings, setNummberMeetings] = useState(0)
    const [showAlert, setShowAlert] = useState({type:'', show:false, message:''})
    const dispatch = useDispatch()


    const [place, setPlace] = useState<any>({
      city:user.place.city,
      latitude: user.place.latitude,
      longitude: user.place.longitude,
    })

    useEffect(()=> {
      const meetingsRef = collection(db, `meetings`)
      const meetingsQuery = query(meetingsRef, where('createdBy.uid', '==', user.uid))
      const unsubscribe = onSnapshot(meetingsQuery, (snapshot) => {
        setNummberMeetings(snapshot.docs.length)
      })

      return unsubscribe
    }, [])
    console.log(nummberMeetings)
    const onChange = (event:any, selectedDate:any) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode:any) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        minimumDate:new Date()
      });
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{ fontSize:21, color:theme.fontColor}}>
            Create meeting
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

      const createMeeting = () => {
        dispatch(setLoading(true))
        const meetingId = uuid();
        const meetingData:MeetingRoom = {
          name: name,
          createdBy: {name:user.name, uid: user.uid, imageUri:user.imageUri},
          date:date,
          people:[],
          place:place,
          id:meetingId,
          authorProject:{carMake:'', imageUri:'', model:'' }
        }

        const meetingRef = doc(db, 'meetings', meetingId)
        if(place.city && place.latitude){
          setDoc(meetingRef, meetingData)
          .then(()=> {
            setShowAlert({message:successText[language as keyof typeof successText], show:true, type:'SUCCRESS'})
            dispatch(setLoading(false))
            navigation.navigate('Meeting')
          })
          .catch(()=> {
            setShowAlert({message:errorText[language as keyof typeof errorText], show:true, type:'ERROR'})
            dispatch(setLoading(false))
          })
        }
        else {
          setShowAlert({message:errorText2[language as keyof typeof errorText2], show:true, type:'ERROR'})
          dispatch(setLoading(false))
        }
      
      }

      const validMeeting = name.length>2  

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
      {showAlert.show&&<AlertModal {...showAlert} resetError={setShowAlert} show/>}
      <SelectPlaceOnMap origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
      {nummberMeetings<1?<View style={{flex:1, width:'100%'}}>
        <CustomInput max={10} fontSize={18} setValue={setName} placeholder={nameMeeting[language as keyof typeof nameMeeting]}/>
        <TouchableOpacity onPress={showDatepicker} style={[style.dateButton, {backgroundColor: theme.backgroundContent}]}>
          <View style={{flexDirection:'column-reverse'}}>
            <Text style={[{color: theme.fontColor}]}>{dateText[language as keyof typeof dateText]}</Text>
            <Text style={[style.dateText]}>{date.toLocaleString()}</Text>
          </View>

          <Icon type='ionicon' name='time-outline' color={theme.fontColorContent}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={[style.locationButton, {backgroundColor: theme.backgroundContent}]}>
          <View>
            <MapView          
              scrollEnabled={false}          
              style={style.miniMap}
              region={{
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              initialRegion={{
                  latitude: 52.22,
                  longitude: 21,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}
            />
          </View>

          <View style={{ alignItems:'center', flex:1}}>
            <Icon type='ionicon' name='location-outline' size={24} color={theme.fontColorContent}/>
          </View>
        </TouchableOpacity>
        <Text style={[style.locationText, {color: theme.fontColorContent}]}>
          {locationText[language as keyof typeof locationText]}
        </Text>
            
        <TouchableOpacity disabled={!validMeeting} onPress={createMeeting} style={[style.createButton, {opacity:!validMeeting?.5:1}]}>
          <Text style={{color: theme.fontColor, fontSize:17, letterSpacing:2, marginRight:10}}>
            {createText[language as keyof typeof createText]}
          </Text>
          <Icon type='materialicon' name='arrow-forward-ios' size={20} color={theme.fontColor}/>
        </TouchableOpacity>    
      </View>: 
          <Text style={[{color: theme.fontColorContent}]}> 
            {language === 'en'?'Basic account can only add 1 meeting':'Podstawowe konto może dodać tylko jeden meeting'}
        </Text>
      }
    </View>
  )
}
export default CreateMeeting