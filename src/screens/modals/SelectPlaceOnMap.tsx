import { Modal, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { selectLanguage } from './../../slices/languageSlice';
import { Icon } from '@rneui/base';
import { envGoogle } from './../../utils/env';

interface SelectPlaceOnMapProps {
    origin: any,
    setOrigin: (value:any) => void,
    modalVisible:boolean, 
    setModalVisible: (value:boolean) => void,
    details?: {description:string, title:string}
}

const SelectPlaceOnMap:React.FC<SelectPlaceOnMapProps> = ({details, origin, setOrigin, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const widthScreen = Dimensions.get("screen").width
    const language = useSelector(selectLanguage)
    const [region, setRegion] = useState<any>({
            city:'',
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,       
            longitudeDelta: 0.0121,
    })

    const [markerCords, setMarkerCords] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >   
            <GooglePlacesAutocomplete 
                onPress={(data, details=null) => {    
                    setRegion({
                        city:data.description,
                        latitude: details?.geometry.location.lat,
                        longitude: details?.geometry.location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    })       
                }}
                fetchDetails={true}
                query={{
                    key: envGoogle.mapsKey,
                    language: 'en'
                }}
                styles={{
                    container: {
                        flex:0,
                        width: widthScreen-20,
                        position:'absolute',
                        zIndex:2,
                        margin:10
                    },
                    textInput: {
                        fontSize: 20,
                        paddingHorizontal:20,
                        paddingVertical:10
                    }
                }}
                placeholder='Search place'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            <MapView          
                style={{flex:1}}
                initialRegion={region}
                region={region}
                provider={PROVIDER_GOOGLE}
                onPress={(e) => setMarkerCords({
                    latitude:  e.nativeEvent.coordinate.latitude,
                    longitude:  e.nativeEvent.coordinate.longitude,
                })}
                // onAccessibilityTap
            >
                <Marker
                    coordinate={{
                        latitude:markerCords.latitude, 
                        longitude: markerCords.longitude,                
                    }}
                    description={details?details.description:''}     
                    title={details?details.title:''}    
                />
            </MapView>
           <TouchableOpacity 
                disabled={!region?.city} 
                style={[style.setButton,
                     {  backgroundColor: region.city?'#293':'rgba(100, 100, 100, .5)'}
                    ]} 
                onPress={()=>(setModalVisible(false), setOrigin({
                    city: region.city,
                    latitude: markerCords.latitude,
                    longitude: markerCords.longitude,
                }))}
            >             
                <Icon type='entypo' name={'check'} size={24} color="white"/>
            </TouchableOpacity>
        </Modal>
  )
}

export default SelectPlaceOnMap


const style = StyleSheet.create({
    googleSearchInput: {

    },
    setButton: {
        position:'absolute',
        bottom: 20,
        right: 20,
        paddingHorizontal:20,
        paddingLeft:20,
        paddingVertical:15,
        borderRadius:50,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        fontSize: 20,
        letterSpacing:2,
        marginRight:8
    }
})
