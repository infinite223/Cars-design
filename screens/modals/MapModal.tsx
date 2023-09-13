import { Modal} from 'react-native'
import React from 'react'
import MapView, { MapMarker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Place } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectProject } from './../../slices/selectedProject';

const MapModal:React.FC<{ place:Place, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({place, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const selectedProject = useSelector(selectProject)

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
          {(place.latitude && place.longitude)&&<MapView
            style={{flex:1}}
            initialRegion={{
              latitude: place.latitude,
              longitude: place.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {place.city&&<MapMarker
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude, 
              }}
              title={selectedProject.car.CarMake+" "+selectedProject.car.model}
              identifier='Origin'
              description={place.city}
            />}
          </MapView>}
      </Modal>
  )
}

export default MapModal

