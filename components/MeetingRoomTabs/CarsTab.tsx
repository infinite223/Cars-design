import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';
import ImagesModal from '../../screens/modals/ImagesModal';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';

const CarsTab = () => {
  const navigationTab:any = useNavigation()
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectImage, setSelectImage] = useState(0)
  const selectedProject = 0

  const theme = useSelector(selectTheme)
  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
      {/* <ImagesModal modalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible} photos={data[selectedProject].car.imagesCar} index={selectImage}/> */}
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="Cars"/>
      {/* <FlatList
        style={{flex:1}}
        scrollEnabled={true}
        data={data[selectedProject].car.imagesCar}
        numColumns={2}
        renderItem={({item, index}) => (
          <TouchableWithoutFeedback onPress={()=>(setImagesModalVisible(true), setSelectImage(index))}>
            <Image style={{width:200, height:120}} source={{uri:item}}/>
          </TouchableWithoutFeedback>
        )}
      /> */}

   </View>
  )
}

export default CarsTab