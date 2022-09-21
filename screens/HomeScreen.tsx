import { View, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Feather } from 'react-native-vector-icons'
import Carproject from '../components/Carproject';
import { useSelector, useDispatch } from 'react-redux';
import { CarprojectData } from '../utils/types';
import { selectTheme } from '../slices/themeSlice';
import { data } from '../utils/data';

const HomeScreen = () => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  console.log(theme, "dds")

 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TextInput placeholder="Search project" placeholderTextColor="#444" style={{fontSize: 17, color:theme.fontColor}} />,
      headerLeft: () => <AntDesign name={'search1'} size={24} color={theme.fontColor} style={{ marginRight: 12 }}/>,
      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Chats')}><Feather name={'message-square'} size={23} color={theme.fontColor} style={{ marginRight: 15 }}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Ionicons name={'md-person-outline'} size={25} color={theme.fontColor} style={{ marginRight: 0 }}/></TouchableOpacity>
      </View>
    })
  }, [theme])

  return (
    <View style={{flex:1,  backgroundColor:theme.background}}>
      <FlatList style={{flex:1, height:"100%"}}
        data={data}
        keyExtractor={carProject => carProject.id}
        renderItem={(carData)=> <Carproject data={carData.item}/>}
      />
      {/* <Button title='logout' onPress={logout}/> */}
    </View>
  )
}
  
export default HomeScreen