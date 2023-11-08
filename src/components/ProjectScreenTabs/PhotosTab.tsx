import { View, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native';
import ImagesModal from '../../screens/modals/ImagesModal';
import { useSelector } from 'react-redux';
import { selectProject } from './../../slices/selectedProject';
import { CarprojectData } from '../../utils/types';
import { selectTheme } from './../../slices/themeSlice';

const PhotosTab = () => {
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectImage, setSelectImage] = useState(0)
  const theme = useSelector(selectTheme) 
  const screenWidth = Dimensions.get('window').width
  const selectedProject:CarprojectData = useSelector(selectProject)

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <ImagesModal modalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible} photos={selectedProject.car.imagesCar} index={selectImage}/>
      <FlatList
        style={{flex:1, backgroundColor: theme.background}}
        scrollEnabled={true}
        data={selectedProject.car.imagesCar}
        numColumns={2}
        renderItem={({item, index}) => (
          <TouchableWithoutFeedback onPress={()=>(setImagesModalVisible(true), setSelectImage(index))}>
            <Image style={{width:screenWidth/2, height:120}} source={{uri:item.url}}/>
          </TouchableWithoutFeedback>
        )}
      />
   </View>
  )
}

export default PhotosTab