import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectRoom, setFocuseOnSearch } from '../../slices/selectedRoomSlice';
import { Avatar, Icon } from '@rneui/base';
import { MeetingRoom } from '../../utils/types';
import { selectLanguage } from '../../slices/languageSlice';

const PeopleTab = () => {
  const navigationTab:any = useNavigation()
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectImage, setSelectImage] = useState(0)
  const selectedProject = 0
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const room:MeetingRoom = useSelector(selectRoom)

  console.log(room.people[0].carProjects)

  return (
    <View style={{flex:1, backgroundColor: theme.background, paddingBottom:30}}>
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="People"/>
      <FlatList
        style={{flex:1}}  
        scrollEnabled={true}
        data={room.people}
        ListHeaderComponent={()=>(
          <View>
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
              <View style={{alignItems:'center', flexDirection:'row'}}>
                <Icon type='evilicon' name='search' size={35} color={theme.fontColorContent}/>
                <TextInput onEndEditing={()=>dispatch(setFocuseOnSearch(false))} onPressIn={()=>dispatch(setFocuseOnSearch(true))} style={{color: theme.fontColor, marginLeft:15}} placeholder='Search people...' placeholderTextColor={theme.fontColorContent}/>
              </View>
                <TouchableOpacity style={style.signMeButton}>
                <Text style={style.singMeText}>{language==='pl'?"Dołącz":"Join"}</Text>
              </TouchableOpacity> 
            </View> 
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={()=> navigationTab.navigate('Profile')}>
            <View style={[style.renderItem, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
             <Avatar size={34} rounded source={{uri: item.imageUri}}/>
             <View style={style.textContainer}>
              <Text style={[style.nameText, {color: theme.fontColor}]}>
                  {item.name}
              </Text>
              <Text style={[style.carText, {color: theme.fontColorContent}]}>
                {item.carProjects.car.CarMake} {item.carProjects.car.model}
              </Text>
             </View>
              <Image
                style={style.imageCar}
                source={{uri: item.carProjects.car.imagesCar[0]}}
              />
            </View>          
          </TouchableOpacity>
        )}
      />
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
    paddingHorizontal:15,
    backgroundColor: '#272',
    paddingVertical:7,
    alignItems: 'center',    
    borderRadius:10,
  },
  singMeText: {
    fontSize:15,
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