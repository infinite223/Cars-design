import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Share, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd, EvilIcons, AntDesign, Feather, Ionicons } from 'react-native-vector-icons';
import { CircleData } from '../components/CircleData';
import { Car } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../components/Tabs/PhotosTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryTab from '../components/Tabs/HistoryTab';
import { LinearGradient } from 'expo-linear-gradient';
import { getColorsCircle } from './../utils/functions/colorsCircle';


const ProjectScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const { car, author, createdAt } = route.params;

    const Tab = createMaterialTopTabNavigator();
    console.log(car.imagesCar.length)

    console.log(author)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:21}}>{car.CarMake} {car.model}</Text>,
           headerLeft: () => (
            <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-around'}}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={22} />
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => 
                <Text style={{fontSize:11, color:'gray'}}>{createdAt}</Text>
        })  
      }, [])
    
      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
        
        }
      };

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ScrollView style={{backgroundColor:'white'}} >
        <View style={{marginHorizontal:15}}>
          <Text style={{color:'#333'}}>{car.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo delectus cum ut quo omnis iste quisquam facere doloribus commodi. Odit cupiditate dolore fuga. Eius aperiam, eos neque quaerat odit ab?</Text>
          <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
              <MaterialIcons name='place' color="#444" size={20} style={{marginRight:3}}/>
              <Text style={{fontSize:17, fontWeight:'600'}}>{author.place}</Text>
          </View>

          <ScrollView horizontal contentContainerStyle={{marginTop:15, paddingVertical:10, flexDirection:'row', justifyContent:'space-between'}}>
            <CircleData type="HP" number={car.performance.hp} colors={getColorsCircle(car.performance.hp, "hp")}/>
            <CircleData type="Nm" number={car.performance.nm} colors={getColorsCircle(car.performance.nm, "nm")}/>
            <CircleData type="0-100km/h" number={car.performance._0_100} colors={getColorsCircle(car.performance._0_100, "acceleration")}/>
            <CircleData type="100-200km/h" number={car.performance._100_200} colors={getColorsCircle(car.performance._0_100, "acceleration")}/>
          </ScrollView>
        </View>

          <Tab.Navigator  
            style={{flex:1, marginTop:20, height:550}}  
            screenOptions={{
              tabBarStyle: { backgroundColor: 'white'},     
              tabBarIndicatorStyle: {
                backgroundColor:'gray',
                borderTopWidth:0,
                borderTopColor:'#D3D3D3', 
                elevation:0
              },
              tabBarShowLabel:false,
              tabBarIndicatorContainerStyle: {
                width: 0, height: 0, elevation: 0,     
              },          
              tabBarPressColor:'pink'
          }}>
            <Tab.Screen name="Photos" component={PhotosTab}
              options={{
                tabBarIcon: ({ focused }) => { 
                  return <AntDesign name="picture" size={25} color={focused?"black":'gray'}/>
                },}}
            />
            <Tab.Screen name="History" component={HistoryTab}
              options={{
                tabBarIcon: ({ focused }) => { return <MaterialIcons name="timeline" size={25} color={focused?"black":'gray'}/>},
              }}
            />
          </Tab.Navigator>
        </ScrollView>
      <View style={{width:'100%', position:'relative', paddingHorizontal:10, paddingVertical:8, marginHorizontal:-15 , flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{marginRight:6}}><Feather name='send' size={23} color="gray"/></TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={{marginRight:6}}><EvilIcons name='share-google' size={30} color="black"/></TouchableOpacity>
            <TouchableOpacity><EvilIcons name='heart' size={32} color="black"/></TouchableOpacity>
            <Text style={{marginLeft:6}}>23</Text>
          </View>
          <View>
            
          </View> 
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{marginRight:10}}>{author.name}</Text>
          <Avatar
            size={34}
            rounded
            source={{uri:author.imageUri}}    
          />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity 
            // onPress={()=>setCreateProjectModalVisible(true)} 
            style={{bottom:5, position:'absolute', alignItems:'center', justifyContent:'center'}
        }>
            <LinearGradient         
                colors={["#339", "#935"]}
                start={[0.7, 0.2]}
                style={{paddingHorizontal:15, paddingVertical:13, borderRadius:15, alignItems:'center'}}
            > 
                <Text style={{fontFamily:"roboto", fontSize:20, color:'white', fontWeight:'bold'}}>C`P</Text>
            </LinearGradient> 
        </TouchableOpacity> */}
    </View>
  )
}

export default ProjectScreen