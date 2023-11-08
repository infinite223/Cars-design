import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { useState } from 'react';
import { style } from './style';
import useAuth, { db } from '../../hooks/useAuth';
import { AlertProps } from '../../utils/types';
import AlertModal from '../modals/AlertModal';
import GeneralProblem from './GeneralProblem';
import SpecyficProblem from './SpecyficProblem';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../../utils/globalStyles';

const CreateProblem = () => {
  const [selectedOption, setSelectedOption] = useState(0)
  const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { user }:any = useAuth()
    const [alertModal, setAlertModal] = useState<AlertProps>({message:'', show:false, type:''})

    const [name, setName] = useState('')
    const colorsGradient = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => 
         <LinearGradient
          // colors={[colorsGradient[3], colorsGradient[3], colorsGradient[1], colorsGradient[3]]}
          colors={[colorsGradient[1], colorsGradient[1], colorsGradient[1], colorsGradient[1]]}
          locations={[0, 0.25, 0.45, 1]}
            start={[0, 0]}   
            end={[0, 1]}   
            style={style.mainHeader}
          >
         <Text style={{ fontSize:16, letterSpacing:1, fontWeight:'500', color:theme.fontColor}}>
            Dodawanie problemu
        </Text>
        </LinearGradient>,
      })
    }, [theme, language])

      const validMeeting = name.length>2  
      const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']
      const colorsGradient_1 = [theme.background, theme.background, theme.background]

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
      {alertModal.show&&<AlertModal {...alertModal} resetError={setAlertModal}/>}

      <View style={style.navigation}>
        <TouchableOpacity 
          style={[style.typeContainer, {borderColor: selectedOption===0?globalStyles.background_1:theme.backgroundContent}]} 
          onPress={() => setSelectedOption(0)}
        >
          {selectedOption===0?<View style={style.typeProblem}>
          <Text style={[{color: theme.fontColor}]}>Problem ogólny</Text>
          </View>:
          <View style={style.typeProblem}>
              <Text style={[{color: theme.fontColor}]}>Problem ogólny</Text>
          </View>
         }
        </TouchableOpacity>

        <TouchableOpacity 
          style={[style.typeContainer, {borderColor: selectedOption===1?globalStyles.background_1: theme.backgroundContent}]} 
          onPress={() => setSelectedOption(1)}
        >
        {selectedOption===1?
          <View
            style={style.typeProblem}
          >
          <Text style={[{color: theme.fontColor}]}>Problem konkretny</Text>
          </View>:
          <View style={style.typeProblem}>
              <Text style={[{color: theme.fontColor}]}>Problem konkretny</Text>
          </View>
         }
        </TouchableOpacity>
      </View>


      <View style={{flex: 1, padding: 10}}>
        {selectedOption===0?
          <GeneralProblem setAlertModal={setAlertModal}/>:
          <SpecyficProblem setAlertModal={setAlertModal}/>
        }
        
      </View>
    </View>
  )
}
export default CreateProblem