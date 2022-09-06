import { View, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Feather } from 'react-native-vector-icons'
import Carproject from '../components/Carproject';
import { CarprojectData } from '../utils/types';

const HomeScreen = () => {
  const navigation:any = useNavigation()
  const urlImageCar = "https://th.bing.com/th/id/R.f59bb5bc1131cc89bc30a50de98fb5e0?rik=qHjGzRpR7TSxxw&riu=http%3a%2f%2fcarsradars.com%2fwp-content%2fuploads%2f2019%2f03%2fcautofotoimg_0199.jpg&ehk=E%2fpd1PO5%2fjGT9UynDb9gkaE4ARnCilDJJLWhht3u2rE%3d&risl=&pid=ImgRaw&r=0" 
  const urlImageAuthor = "https://th.bing.com/th/id/R.657afe7932946deea8032c84dbcd9642?rik=o7n%2fQlA2X5Iy%2fw&pid=ImgRaw&r=0"
  const data:CarprojectData[] = [
    {
      id:"1",
      author:{ name:"Darek", email:"dasadas@gmail.com", imageUri:urlImageAuthor},
      createdAt:"02 11 2021",
      car: {CarMake: "BMW", model: "M4", description: "Fajne autko", hp:530, nm:600, imagesCar: [urlImageCar], performance: [4.1, 7.3]}
    }
  ]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
       },
      headerTitle: () => <TextInput placeholder="Search project" placeholderTextColor="#444" style={{fontSize: 17}} />,
      headerLeft: () => <AntDesign name={'search1'} size={24} color="black" style={{ marginRight: 12 }}/>,
      headerRight: () => 
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity><Feather name={'message-square'} size={23} color="#333" style={{ marginRight: 15 }}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Ionicons name={'md-person-outline'} size={25} color="black" style={{ marginRight: 0 }}/></TouchableOpacity>
      </View>
    })
  }, [])

  return (
    <View style={{flex:1,  backgroundColor:'white'}}>
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