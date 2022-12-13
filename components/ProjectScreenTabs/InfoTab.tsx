import { View, Image, TouchableWithoutFeedback, Text } from 'react-native'
import React, { useState } from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { Dimensions, ScrollView } from 'react-native';
import ImagesModal from '../../screens/modals/ImagesModal';
import { useSelector } from 'react-redux';
import { selectProject } from './../../slices/selectedProject';
import { CarprojectData } from '../../utils/types';
import { selectTheme } from './../../slices/themeSlice';
import { CircleData } from '../CircleData';
import { getColorsCircle } from '../../utils/functions/colorsCircle';
import MapModal from '../../screens/modals/MapModal';
import { Icon } from '@rneui/base';

import { style } from '../../screens/Project/style';
import { TouchableOpacity } from 'react-native';

const InfoTab = () => {
  const navigationTab:any = useNavigation()
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const theme = useSelector(selectTheme) 
  const screenWidth = Dimensions.get('window').width
  const selectedProject:CarprojectData = useSelector(selectProject)
  const [mapModalVisible, setMapModalVisible] = useState(false)


  return (
    <View style={{flex:1, backgroundColor: theme.background, padding:15}}>
        <MapModal modalVisible={mapModalVisible} setModalVisible={setMapModalVisible}/>
        <ScrollView style={{backgroundColor:theme.background}} contentContainerStyle={{flex:1}}>
            <Text style={[style.descriptopnText, {color:theme.fontColorContent}]}>{selectedProject.car.description}</Text>
            <TouchableOpacity onPress={()=>setMapModalVisible(true)} style={style.locationContainer}>          
                <Icon type="materialicon" name='place' color={theme.fontColor} size={20} style={{marginRight:5}}/>
                <Text style={[style.locationPlace, {color:theme.fontColor}]}>Opole</Text>
            </TouchableOpacity>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingRight:8}}
                style={{flexGrow:0}}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
                snapToInterval={105}
                data={selectedProject.car.performance}
                renderItem={({item})=> (
                    <>
                        {
                            item?
                            <CircleData type={item.type} number={item.value} colors={getColorsCircle(item.value, item.type)}/>
                            :<View/>
                        }
                    </>
                )}
            />
            <View style={{flex:1}}>
                <Text style={{color:theme.fontColor}}>Info</Text>
            </View>
        </ScrollView>
    </View>
  )
}

export default InfoTab