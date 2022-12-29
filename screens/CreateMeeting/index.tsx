import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/themed';

const CreateMeeting = () => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    
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

  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
     
    </View>
  )
}
export default CreateMeeting