import { Modal, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GOOGLE_MAPS_APIKEY } from '@env'
import { useSelector } from 'react-redux';
import { selectLanguage } from './../../slices/languageSlice';
import { Icon } from '@rneui/base';

import { envGoogle } from './../../utils/env';

interface SelectPlaceOnMapProps {
    origin: any,
    setOrigin: (value:any) => void,
    modalVisible:boolean, 
    setModalVisible: (value:boolean) => void,
}

const SelectPlaceOnMap:React.FC<SelectPlaceOnMapProps> = ({origin, setOrigin, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const widthScreen = Dimensions.get("screen").width
    const language = useSelector(selectLanguage)
    const [region, setRegion] = useState<any>({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
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
                        latitude: details?.geometry.location.lat,
                        longitude: details?.geometry.location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    })
                    setOrigin({
                        region: region,
                        place: data
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
            />
            <TouchableOpacity disabled={!origin.region} style={[style.setButton]} onPress={()=>setModalVisible(false)}>             
                <Icon type='entypo' name={'check'} size={22} color="black"/>
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
        paddingHorizontal:15,
        paddingLeft:20,
        paddingVertical:5,
        backgroundColor: 'white',
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
