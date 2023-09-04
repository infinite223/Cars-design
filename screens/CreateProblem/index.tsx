import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/themed';
import CustomInput from '../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { style } from './style';
import SelectPlaceOnMap from './../modals/SelectPlaceOnMap';
import useAuth, { db } from '../../hooks/useAuth';
import { MeetingRoom, SpecyficProblemType } from '../../utils/types';
import MapView from 'react-native-maps';
import { v4 as uuid } from 'uuid';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import AlertModal from '../modals/AlertModal';
import { setLoading } from '../../slices/loadingSlice';
import GeneralProblem from './GeneralProblem';
import SpecyficProblem from './SpecyficProblem';
import { globalStyles } from '../../utils/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const CreateProblem = () => {
  const [selectedOption, setSelectedOption] = useState(0)
  const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user }:any = useAuth()

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date());
    const [nummberMeetings, setNummberMeetings] = useState(0)
    const [showAlert, setShowAlert] = useState({type:'', show:false, message:''})
    const dispatch = useDispatch()

  
    
    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => <Text style={{ fontSize:20, letterSpacing:1, fontWeight:'500', color:theme.fontColor}}>
            Tworzenie problemu
        </Text>,
  })
    }, [theme, language])

      const validMeeting = name.length>2  
      const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
      <View style={style.navigation}>
        <TouchableOpacity 
          style={[style.typeContainer, {backgroundColor: theme.backgroundContent}]} 
          onPress={() => setSelectedOption(0)}
        >
          {selectedOption===0?<LinearGradient
          colors={colorsProblemGradient}
          locations={[0, 0.25, 0.45, 1]}
          start={[0, 1]}   
          end={[1, 0]}   
          style={style.typeProblem}
        >
          <Text style={[{color: theme.fontColor}]}>Problem ogólny</Text>

        </LinearGradient>:
        <View style={style.typeProblem}>
            <Text style={[{color: theme.fontColor}]}>Problem ogólny</Text>
        </View>
         }
        </TouchableOpacity>

        <TouchableOpacity 
          style={[style.typeContainer, {backgroundColor: theme.backgroundContent}]} 
          onPress={() => setSelectedOption(1)}
        >
          {selectedOption===1?<LinearGradient
          colors={colorsProblemGradient}
          locations={[0, 0.25, 0.45, 1]}
          start={[0, 1]}   
          end={[1, 0]}   
          style={style.typeProblem}
        >
          <Text style={[{color: theme.fontColor}]}>Problem konkretny</Text>

        </LinearGradient>:
        <View style={style.typeProblem}>
            <Text style={[{color: theme.fontColor}]}>Problem konkretny</Text>
        </View>
         }
        </TouchableOpacity>
      </View>


      <View style={{flex: 1, padding: 10}}>
        {selectedOption===0?
          <GeneralProblem/>:
          <SpecyficProblem/>
        }
        
      </View>
    </View>
  )
}
export default CreateProblem