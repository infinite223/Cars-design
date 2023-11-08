import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, {useState} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectRoom, setFocuseOnSearch } from '../../slices/selectedRoomSlice';
import { Avatar, Icon } from '@rneui/base';
import { MeetingRoom, MicroCarprojectData } from '../../utils/types';
import { selectLanguage } from '../../slices/languageSlice';
import { doc, onSnapshot, arrayRemove } from 'firebase/firestore';
import useAuth, { db } from '../../hooks/useAuth';
import { updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import SelectProjectModal from './../../screens/modals/SelectProjectModal';
import { globalStyles } from '../../utils/globalStyles';

const PeopleTab = () => {
  const navigationTab:any = useNavigation()
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const room:MeetingRoom = useSelector(selectRoom)
  const [showSelectModal, setShowSelectModal] = useState(false)
  const [people, setPeople] = useState<any>([])
  const { user }:any = useAuth()
  const isMyMeeting = user.uid === room.createdBy.uid

  const unJoinMe = () => {
    const poeople = people?.people?.find((people:any)=> people.uid === user.uid)
    const meetingRef = doc(db, 'meetings', room.id)

    updateDoc(meetingRef, {
      'people':arrayRemove(poeople)
    })
  }

  useEffect(()=> {
    const peopleRef = doc(db, 'meetings', room.id)

    const unsubscribe = onSnapshot(peopleRef, (snapshot) => {
      setPeople(snapshot.data())
    })

    return unsubscribe
  }, [])

  return (
    <View style={{flex:1, backgroundColor: theme.background, paddingBottom:30}}>
      <SelectProjectModal roomId={room.id} modalVisible={showSelectModal} setModalVisible={setShowSelectModal}/>
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="People"/>
      {people?.people&&<FlatList
        style={{flex:1}}  
        scrollEnabled={true}
        data={people?.people}
        ListHeaderComponent={()=>(
          <View>
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
              <View style={{alignItems:'center', flexDirection:'row'}}>
                <Icon type='evilicon' name='search' size={35} color={theme.fontColorContent}/>
                <TextInput onEndEditing={()=>dispatch(setFocuseOnSearch(false))} onPressIn={()=>dispatch(setFocuseOnSearch(true))} style={{color: theme.fontColor, marginLeft:15}} placeholder='Search people...' placeholderTextColor={theme.fontColorContent}/>
              </View>
              {(!isMyMeeting && !people.people?.find((people:any)=> people.uid === user.uid))&&<TouchableOpacity onPress={()=> setShowSelectModal(true)} style={style.signMeButton}>
                  <Text style={style.singMeText}>{language==='pl'?"Dołącz":"Join"}</Text>
              </TouchableOpacity> }
              {people.people?.find((people:any)=> people.uid === user.uid)&&
               <TouchableOpacity onPress={unJoinMe} style={[style.signMeButton, {backgroundColor: '#732',}]}>
                  <Text style={style.singMeText}>{language==='pl'?"Zrezygnuj":"unJoin"}</Text>
              </TouchableOpacity> 
              }
            </View> 
            <TouchableOpacity onPress={()=> navigationTab.navigate('Profile', {uid: room.createdBy.uid, displayName:room.createdBy.name})}>
              <View style={[style.renderItem, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
              <Avatar size={34} rounded source={{uri: room.createdBy.imageUri}}/>
              <View style={style.textContainer}>
                <Text style={[style.nameText, {color: theme.fontColor}]}>
                    {room.createdBy.name}
                    <Text style={{color: globalStyles.background_2, fontSize:12, fontWeight:'400'}}> Admin</Text>       
                </Text>
                <Text style={[style.carText, {color: theme.fontColorContent}]}>
                  {room.authorProject?.carMake != undefined&& room.authorProject?.carMake+ " " +room.authorProject?.model}
                </Text>
              </View>
                <Image
                  style={style.imageCar}
                  source={{uri: room.authorProject?.imageUri}}
                />
              </View>   
            </TouchableOpacity>
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={()=> navigationTab.navigate('Profile', {uid: item.uid, displayName:item.name})}>
            <View style={[style.renderItem, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
             <Avatar size={34} rounded source={{uri: item.imageUri}}/>
             <View style={style.textContainer}>
              <Text style={[style.nameText, {color: theme.fontColor}]}>
                  {item.name}
              </Text>
              <Text style={[style.carText, {color: theme.fontColorContent}]}>
                {item.carProject?.carMake} {item.carProject?.model}
              </Text>
             </View>
              <Image
                style={style.imageCar}
                source={{uri: item.carProject?.imageUri}}
              />
            </View>          
          </TouchableOpacity>
        )}
      />}
   </View>
  )
}

export default PeopleTab

const style = StyleSheet.create({
  renderItem: {
    position: 'relative',
    flexDirection:'row',
    paddingHorizontal:15,
    marginHorizontal:15,
    paddingVertical:12,
    marginVertical:7,
    flex:1,
    alignItems: 'center',    
    borderRadius:10,
  },
  textContainer: {
    marginLeft:15
  },
  nameText: { 
    fontSize:15,
  },
  carText: {
    fontSize: 12
  },
  imageCar: {
    width:90,
    height:40,
    position: 'absolute',
    right: 15,
    borderRadius: 2
  },
  signMeButton: {
    flexDirection:'row',
    minWidth:100,
    justifyContent:'center',
    paddingHorizontal:10,
    backgroundColor: globalStyles.background_1,
    paddingVertical:5,
    alignItems: 'center',    
    borderRadius:10,
  },
  singMeText: {
    fontSize:13,
    letterSpacing:2,
    fontWeight:'bold',
    color:'white'
  },
  searchContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    borderRadius:10,
    paddingVertical:7,
    marginHorizontal:15,


    marginBottom:5
  }
})