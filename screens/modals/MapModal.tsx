import { Modal} from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapModal:React.FC<{ modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({ modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
          <MapView
            style={{flex:1}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      </Modal>
  )
}

export default MapModal

