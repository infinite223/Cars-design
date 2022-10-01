import { View, Text, Modal, Alert, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from 'react-native-vector-icons';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

interface SelectPlaceOnMapProps {
    origin: any,
    setOrigin: (value:any) => void,
    modalVisible:boolean, 
    setModalVisible: (value:boolean) => void,
}

const SelectPlaceOnMap:React.FC<SelectPlaceOnMapProps> = ({origin, setOrigin, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const widthScreen = Dimensions.get("screen").width
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
            {/* <TextInput style={style.googleSearchInput}/> */}
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
                    key: "AIzaSyBO5SVbSIFcBcUAWe6ZaXjCCIcT8cpFo7s",
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
        </Modal>
  )
}

export default SelectPlaceOnMap


const style = StyleSheet.create({
    googleSearchInput: {

    }
})
