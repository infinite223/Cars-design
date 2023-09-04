import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectTheme } from '../../slices/themeSlice'
import { style } from './style'
import { LinearGradient } from 'expo-linear-gradient'

const CreateScreen = () => {

  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const colorsProjectGradient = ['rgb(12,94,88)', 'rgb(1, 71, 67)','rgb(1, 131, 107)', 'rgb(12,57,48)']
  const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']
  const colorsMeetingGradient = ['rgb(22,94,108)', 'rgb(31, 71, 87)','rgb(41, 131, 167)', 'rgb(12,57,78)']
  return (
    <View style={[style.createContainer, {backgroundColor: theme.background}]}>
      <TouchableOpacity activeOpacity={.6} style={style.createSection} onPress={() => navigation.navigate('CreateProject')}>
      <LinearGradient
        colors={colorsProjectGradient}
        locations={[0, 0.25, 0.45, 1]}
        start={[.3, .9]}   
        end={[1, 0]}   
        style={style.createSection}
      >
        <Text style={[style.textSection, {color: theme.fontColor}]}>
          Dodaj projekt
        </Text>
        <Text style={[style.description, {color: theme.fontColorContent}]}>
          Podziel się z innymi własnym projektem
        </Text>
      </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6} style={style.createSection}  onPress={() => navigation.navigate('CreateProblem')}>
      <LinearGradient
        colors={colorsProblemGradient}
        locations={[0, 0.25, 0.45, 1]}
        start={[0, 1]}   
        end={[1, 0]}   
        style={style.createSection}
      >
        <Text style={[style.textSection, {color: theme.fontColor}]}>
          Utwórz problem
        </Text>
        <Text style={[style.description, {color: theme.fontColorContent}]}>
          Masz jakiś problem z samochodem? dodaj go tutaj, może akurat ktoś miał podobny problem i zna rozwiązanie
        </Text>
      </LinearGradient>

      </TouchableOpacity>
      <TouchableOpacity 
        activeOpacity={.6}
        onPress={() => navigation.navigate('CreateMeeting')}
        disabled 
        style={[style.createSection, {opacity: .4}]}
      >
      <LinearGradient
        colors={colorsMeetingGradient}
        locations={[0, 0.25, 0.45, 1]}
        start={[.5, .5]}   
        end={[1, 0]}   
        style={style.createSection}
      >
        <Text style={[style.textSection, {color: theme.fontColor}]}>
          Utwórz spotkanie
        </Text>
      </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default CreateScreen


