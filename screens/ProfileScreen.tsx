import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd, EvilIcons, Entypo } from 'react-native-vector-icons';
import { data } from '../utils/data';
import { LinearGradient } from 'expo-linear-gradient';
import EditProfileScreen from './modals/EditProfileModal';
import CreateProjectScreen from './modals/CreateProjectModal';

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const { user, logout }:any = useAuth()
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:10, fontSize:18}}>Dawid</Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', width:65, justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={22} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditProfileModalVisible(true)}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:user.photoURL}}    
                    />
                </TouchableOpacity>
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
    <View style={{flex:1, backgroundColor:'white', marginHorizontal:15, position:'relative'}}>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
        <CreateProjectScreen modalVisible={createProjectModalVisible} setModalVisible={setCreateProjectModalVisible}/>
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
            <Text style={{letterSpacing:1, fontSize:17, fontWeight:'600', marginVertical:10}}>My cars projects</Text>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({item: {car, author, createdAt}})=> 
                    <TouchableOpacity style={{position:'relative', flex:.5, flexDirection:'row', alignItems:'center' }} onPress={()=>navigation.navigate('Project', {car, author, createdAt})}>
                        <Image style={{height:50, width:50, borderRadius:50, resizeMode:'cover'}} source={{uri:car.imagesCar[0]}}/>
                        <View style={{marginHorizontal:10, flex:1}}>
                            <Text>{car.CarMake}</Text>
                            <Text>{car.model}</Text>
                        </View>
                        <Text style={{fontSize:17, marginRight:5}}>{car.likes}</Text>
                        <EvilIcons name='heart' size={30} color="red"/>
                    </TouchableOpacity>}
            />
        </View>

        <TouchableOpacity 
            onPress={()=>setCreateProjectModalVisible(true)} 
            style={{position:'absolute', bottom:15, right:5, alignItems:'center', justifyContent:'center'}
        }>
            <LinearGradient         
                colors={["#339", "#935"]}
                start={[0.7, 0.2]}
                style={{paddingHorizontal:10, paddingVertical:10, borderRadius:50}}
            > 
                <Entypo name='plus' size={35} color="white"/>
            </LinearGradient> 
        </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen