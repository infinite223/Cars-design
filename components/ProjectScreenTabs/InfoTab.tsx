import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProject } from './../../slices/selectedProject';
import { CarprojectData } from '../../utils/types';
import { selectTheme } from './../../slices/themeSlice';
import { CircleData } from '../CircleData';
import { getColorsCircle } from '../../utils/functions/colorsCircle';
import MapModal from '../../screens/modals/MapModal';
import { Icon } from '@rneui/base';
import { Audio } from 'expo-av';
import { style } from '../../screens/Project/style';
import { TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import engineImg from './../../assets/componentsIcons/engine_white.png'
import transmission_white from './../../assets/componentsIcons/transmission_white.png'

const InfoTab = () => {
  const theme = useSelector(selectTheme) 
  const selectedProject:CarprojectData = useSelector(selectProject)
  const [mapModalVisible, setMapModalVisible] = useState(false)
  const [play, setPlay] = useState<boolean>(false);
  const [sound, setSound] = useState<any>(null)

  const { soundCheck } =  selectedProject.car

  useLayoutEffect(() => {
    setSound(null)
    if(soundCheck){
        const createSoundCheck = async () => {  
            if(!sound){
                const { sound } = await Audio.Sound.createAsync({uri: soundCheck})
                setSound(sound)
            }
        }
        createSoundCheck()
    }
    
  }, [selectedProject])

  console.log(selectedProject)
  const getBaseColors = getColorsCircle(selectedProject.car.history[selectedProject.car.history.length-1].performance?.[0].value, 'hp')

  const soundControl = async (playSound:boolean) => {
        if(sound){
            console.log('xd')
            setPlay(!play)
            if(playSound){
                await sound.playAsync();
                console.log('Playing Sound');
              }
            else {
                await sound.stopAsync()
                console.log('stop playing Sound');
            }
        }
    }

  return (
    <View style={{flex:1, backgroundColor: theme.background, paddingVertical:5, paddingHorizontal:15}}>
        {selectedProject.place&&<MapModal place={selectedProject.place} modalVisible={mapModalVisible} setModalVisible={setMapModalVisible}/>}
        <ScrollView style={{backgroundColor:theme.background}} contentContainerStyle={{flex:1}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingRight:8, paddingTop:10}}
                style={{flexGrow:0}}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
                snapToInterval={105}
                data={selectedProject.car.history[selectedProject.car.history.length-1].performance}
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

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
                <TouchableOpacity disabled={soundCheck.length<1} onPress={()=>{soundControl(!play)}} style={[localStyle.soundContainer, {borderColor:soundCheck.length>1?theme.fontColorContent:theme.backgroundContent}]}>
                    {!play?<Icon type='feather' name='play' size={20} color={soundCheck.length>1?theme.fontColor:theme.backgroundContent}/>
                    :<Icon type='feather' name='pause' size={20} color={soundCheck.length>1?theme.fontColor:theme.backgroundContent}/>}
                    <Text style={[localStyle.soundText, {color:soundCheck.length>1?theme.fontColor:theme.backgroundContent}]}>Sound check</Text>
                </TouchableOpacity>

                    <LinearGradient
                        colors={getBaseColors}
                        style={localStyle.gradient}
                        start={{x:0, y:0}}
                        end={{x:1, y:2}}
                    >
                        <Text style={[localStyle.stageNumber, {color: theme.fontColor}]}>
                            {selectedProject?.car?.history[selectedProject?.car?.history.length-1]?.name}
                        </Text>
                    </LinearGradient>
            </View>
            <View style={{ flex:1 }}>
                    {selectedProject.car.description.length>1&&<Text style={[style.descriptopnText, {color:theme.fontColorContent}]}>
                        {selectedProject.car.description}
                    </Text>}
                    <View style={{flex: 1, marginTop:40}}>
                    <View style={[localStyle.header, {width: 140, backgroundColor: theme.backgroundContent}]}>
                        <Image style={{width: 20, height:20}} source={engineImg}/>
                        <Text style={[localStyle.headerText, {color: theme.fontColor}]}>Silnik</Text>
                    </View>
                    <View style={[localStyle.itemContainer, {borderColor: theme.backgroundContent}]}>
                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.engine.name}
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                nazwa
                            </Text>
                        </View>

                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.engine.cylinderType}                       
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Typ
                            </Text>
                        </View>
                        

                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.engine.volume}                        
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Pojemność
                            </Text>
                        </View>

                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.engine.fuel}
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Paliwo
                            </Text>
                        </View>
                    </View>

                    <View style={[localStyle.header, {width: 210, backgroundColor: theme.backgroundContent}]}>
                        <Image style={{width: 15, height:15, opacity:.7}} source={transmission_white}/>
                        <Text style={[localStyle.headerText, {color: theme.fontColor}]}>Napęd/Skrzynia</Text>
                    </View>
                    <View style={[localStyle.itemContainer, {borderColor: theme.backgroundContent}]}>
                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.driveType}
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Napęd
                            </Text>
                        </View>
                        
                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.transmission.name}                       
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Skrzynia
                            </Text>
                        </View>

                        <View style={[localStyle.textContainer]}>
                            <Text style={[localStyle.textValue ,{color: theme.fontColor}]}>
                                {selectedProject.car.mainDataCarType.transmission.countGear}
                            </Text>
                            <Text style={[localStyle.textType, {color: theme.fontColorContent}]}>
                                Ilość biegów
                            </Text>
                        </View>
                    </View>
                </View>
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

            {(selectedProject.place?.latitude && selectedProject.place?.longitude)&&<View style={{marginTop:15}}>
                <TouchableOpacity onPress={()=>setMapModalVisible(true)} style={localStyle.mapContainer}>          
                    <MapView          
                        scrollEnabled={false}          
                        style={localStyle.miniMap}
                        initialRegion={{
                            latitude: selectedProject.place?.latitude,
                            longitude: selectedProject.place?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    <View style={localStyle.mapData}>
                        <Icon type="materialicon" name='place' color={theme.fontColor} size={22} style={{marginRight:5}}/>
                        <Text style={[style.locationPlace, {color:theme.fontColor}]}>
                            {selectedProject.place?.city}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>}
        </ScrollView>
    </View>
  )
}

export default InfoTab

const localStyle = StyleSheet.create({
    itemContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderRadius: 5,
        borderTopLeftRadius:0,
        borderWidth:1
    },
    textContainer: {
        padding:5,
        paddingHorizontal: 10,
        flex: 1,
        marginHorizontal: 5,
        paddingVertical:7,
        textAlign:'center',
        textAlignVertical:'center',
        justifyContent: 'center',
    },
    header: {
        padding:10,
        borderTopRightRadius:50,
        borderTopLeftRadius:0,
        paddingLeft:15,
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    headerText: {
        textTransform:'uppercase',
        fontWeight:'300',
        letterSpacing:1,
    },
    textValue: {
        fontSize:14,
        textAlign: 'center'
    },
    textType: {
        fontSize: 10,
        textAlign: 'center'

    },
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
        opacity:.9,
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