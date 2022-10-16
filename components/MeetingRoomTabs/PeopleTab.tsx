import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { selectRoom } from '../../slices/selectedRoomSlice';
import { Avatar } from '@rneui/base';
import { MeetingRoom } from '../../utils/types';

const PeopleTab = () => {
  const navigationTab:any = useNavigation()
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectImage, setSelectImage] = useState(0)
  const selectedProject = 0

  const theme = useSelector(selectTheme)
  const room:MeetingRoom = useSelector(selectRoom)

  console.log(room.people[0].carProjects)

  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="People"/>
      <FlatList
        style={{flex:1}}  
        scrollEnabled={true}
        data={room.people}
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
    marginVertical:5,
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
  }
})