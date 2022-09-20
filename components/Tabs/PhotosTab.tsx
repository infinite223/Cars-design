import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';

const PhotosTab = () => {
  const navigationTab:any = useNavigation()
  const selectedProject = 0

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="Photos"/>
      <FlatList
        style={{flex:1}}
        scrollEnabled={true}
        data={data[selectedProject].car.imagesCar}
        numColumns={2}
        renderItem={({item}) => (
          <Image style={{width:200, height:120}} source={{uri:item}}/>
        )}
      />

   </View>
  )
}

export default PhotosTab