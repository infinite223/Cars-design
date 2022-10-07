import { View, Text, Modal, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@rneui/themed';
import { User } from '../../utils/types';
import { Ionicons } from 'react-native-vector-icons';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';

const MeetingRoomModal:React.FC<{ modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({ modalVisible, setModalVisible}) => {
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
        <View>
            
        </View>
      </Modal>
  )
}



export default MeetingRoomModal