import { View, Image, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
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
import { Avatar, Icon } from '@rneui/base';
import { Audio } from 'expo-av';
import { style } from '../../screens/Project/style';
import { TouchableOpacity } from 'react-native';
import { likeProject, onShare } from '../../utils/functions/projectFunctions';
import useAuth from '../../hooks/useAuth';
import MapView from 'react-native-maps';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { playSound } from '../../utils/functions/playSound';

const InfoTab = () => {
  const navigationTab:any = useNavigation()
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [chatModalVisible, setChatModalVisible] = useState(false)
  const theme = useSelector(selectTheme) 
  const navigation:any = useNavigation()
  const screenWidth = Dimensions.get('window').width
  const selectedProject:CarprojectData = useSelector(selectProject)
  const [mapModalVisible, setMapModalVisible] = useState(false)
  const [sound, setSound] = React.useState<any>(null);

  const { soundCheck } =  selectedProject.car

  const getBaseColor = selectedProject.car.performance?.[0].value?getColorsCircle(selectedProject.car.performance?.[0].value, selectedProject.car.performance[0].type)[0]:['#273']
  const getBaseColors = selectedProject.car.performance?.[0].value?getColorsCircle(selectedProject.car.performance?.[0].value, selectedProject.car.performance[0].type):['#273']

  return (
    <View style={{flex:1, backgroundColor: theme.background, padding:15}}>
        <MapModal modalVisible={mapModalVisible} setModalVisible={setMapModalVisible}/>
        <ScrollView style={{backgroundColor:theme.background}} contentContainerStyle={{flex:1}}>
  
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

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <TouchableOpacity disabled={soundCheck.length<1} onPress={()=>playSound(soundCheck)} style={[localStyle.soundContainer, {borderColor:soundCheck.length>1?theme.fontColorContent:theme.backgroundContent}]}>
                    <Icon type='feather' name='play' size={20} color={soundCheck.length>1?theme.fontColor:theme.backgroundContent}/>
                    <Text style={[localStyle.soundText, {color:soundCheck.length>1?theme.fontColor:theme.backgroundContent}]}>Sound check</Text>
                </TouchableOpacity>

                    <LinearGradient
                        colors={getBaseColors}
                        style={localStyle.gradient}
                        start={{x:0, y:0}}
                        end={{x:1, y:2}}
                    >
                        <Text style={[localStyle.stageNumber, {color: theme.fontColor}]}>
                            Stock
                        </Text>
                    </LinearGradient>
            </View>

            <View style={{flex:1}}>
                <Text style={[style.descriptopnText, {color:theme.fontColorContent}]}>
                        {selectedProject.car.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur culpa sequi ad, ea accusamus quibusdam nesciunt, perspiciatis earum, dolor nulla illo deserunt consequuntur possimus? Non eligendi deleniti enim molestiae tenetur.
                    </Text>
                </View>

            <View style={localStyle.footerLinks}>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL(selectedProject.car.links?.yt)} 
                    style={localStyle.linkContainer}
                    disabled={selectedProject.car.links?.yt.length<1}
                >
                     <Icon type='entypo' name='youtube' size={22} color={selectedProject.car.links?.yt.length>1?theme.fontColor:theme.backgroundContent}/>
                    <Text style={[localStyle.linkText, {color: selectedProject.car.links?.yt.length>1?theme.fontColorContent:theme.backgroundContent}]}>Youtube</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL(selectedProject.car.links?.ig)}  
                    style={localStyle.linkContainer}
                    disabled={selectedProject.car.links?.ig.length<1}
                >
                    <Icon type='entypo' name='instagram' size={22} color={selectedProject.car.links?.ig.length>1?theme.fontColor:theme.backgroundContent}/>
                    <Text style={[localStyle.linkText, {color: selectedProject.car.links?.ig.length>1?theme.fontColorContent:theme.backgroundContent}]}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL(selectedProject.car.links?.fb)}  
                    style={localStyle.linkContainer}
                    disabled={selectedProject.car.links?.fb.length<1}
                >
                     <Icon type='entypo' name='facebook' size={22} color={selectedProject.car.links?.fb.length>1?theme.fontColor:theme.backgroundContent}/>
                    <Text style={[localStyle.linkText, {color: selectedProject.car.links?.fb.length>1?theme.fontColorContent:theme.backgroundContent}]}>Facebook</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:15}}>
                <TouchableOpacity onPress={()=>setMapModalVisible(true)} style={localStyle.mapContainer}>          
                    <MapView          
                        scrollEnabled={false}          
                        style={localStyle.miniMap}
                        initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    />
                    <View style={localStyle.mapData}>
                        <Icon type="materialicon" name='place' color={theme.fontColor} size={22} style={{marginRight:5}}/>
                        <Text style={[style.locationPlace, {color:theme.fontColor}]}>Opole</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

export default InfoTab

const localStyle = StyleSheet.create({
    footerLinks: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:-5,
    },
    linkContainer: {
        flexDirection:'row',
        paddingHorizontal:10
    },
    linkText: { 
        marginLeft:10
    },
    soundContainer: {
        flexDirection:'row', 
        alignItems:'center',
        marginTop:10,
        borderRadius:15,
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:5
    },
    soundText: {
        fontSize:15,
        marginLeft:8,
    },
    gradient: {
        borderRadius:15,
        paddingHorizontal:15,
        paddingVertical:5,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center'
    },
    stageNumber: {
        fontSize:15,
        letterSpacing:1,
        fontWeight:'bold',
        width:'100%'
    },
    mapContainer: {
        marginVertical:0,
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent:'center'
    },
    miniMap: {
        position:'relative',
        width:'100%',
        height:37,
        opacity:.7,
        borderRadius:0,
    },
    mapData: {
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20
    }
})