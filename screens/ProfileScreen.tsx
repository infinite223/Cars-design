import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd } from 'react-native-vector-icons';

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const { user, logout }:any = useAuth()
        {/* <MaterialIcons name={'arrow-back-ios'} size={20} /> */}
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:10, fontSize:18}}>Dawid</Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', width:65, justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={24} />
                </TouchableOpacity>
               <Avatar
                    size={34}
                    rounded
                    source={{uri:user.photoURL}}    
                />
            </View>
          ),
          headerRight: () => 
                <TouchableOpacity onPress={()=> logout()}>
                    <Text style={{fontSize:15}}>Log Out</Text>    
                </TouchableOpacity>    
        })  
      }, [])
    
    console.log(user.photoURL)
  return (
    <View style={{flex:1, backgroundColor:'white', marginHorizontal:15}}>
        <View style={{marginVertical:5}}>
            <Text style={{letterSpacing:1, fontSize:17, fontWeight:'600'}}>About me</Text>
            <Text style={{color:"gray"}}>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.a
                 Blanditiis, nostrum...
            </Text>
        </View>

        <View style={{flexDirection:'row', marginVertical:5}}>
            <TouchableOpacity style={{flexDirection:'row', borderRadius:7, borderWidth:1, paddingHorizontal:10, paddingVertical:5}}>
                <Text>Followers</Text>
                <Text style={{marginLeft:5, color:"#935"}}>23</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft:10, flexDirection:'row', borderRadius:7, borderWidth:1, paddingHorizontal:10, paddingVertical:5}}>
                <Text>Views</Text>
                <Text style={{marginLeft:5, color:"#93f"}}>50</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft:10, flexDirection:'row', borderRadius:7, borderWidth:1, paddingHorizontal:10, paddingVertical:5}}>
                <Text>Following</Text>
                <Text style={{marginLeft:5, color:"#a25"}}>65</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:5}}>
            <Text style={{letterSpacing:1, fontSize:17, fontWeight:'600'}}>My cars projects</Text>
            <Text style={{color:"gray"}}>
                
            </Text>
        </View>
    </View>
  )
}

export default ProfileScreen