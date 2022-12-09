import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from '@rneui/base';
import { CircleData } from '../../components/CircleData';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../../components/ProjectScreenTabs/PhotosTab';
import HistoryTab from '../../components/ProjectScreenTabs/HistoryTab';
import { getColorsCircle } from './../../utils/functions/colorsCircle';
import { onShare, likeProject } from '../../utils/functions/projectFunctions';
import ChatModal from './../modals/ChatModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import MapModal from './../modals/MapModal';
import { style } from './style';
const widthScreen = Dimensions.get('window').width

const SearchScreen = () => {
    const navigation:any = useNavigation()
    const navigationTabs: any = useNavigation()
    const [chatModalVisible, setChatModalVisible] = useState(false)
    const [mapModalVisible, setMapModalVisible] = useState(false)
    const theme = useSelector(selectTheme)

    const Tab = createNativeStackNavigator();

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{ fontSize:21, color:theme.fontColor}}>
           <Text style={{color: theme.fontColor}}>Search project</Text>
           </Text>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          ),
          headerRight: () => 
              <Image style={{width:40, height:40, marginVertical:10}} source={require('../../assets/cars_projects_IconV2.png')}/>

        })  
      }, [theme])

  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
     
    </View>
  )
}

export default SearchScreen

