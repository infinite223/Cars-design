import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectTheme } from '../../slices/themeSlice'
import { style } from './style'
import CreateItem from './CreateItem'
import { Image } from 'react-native'
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'

const createOptions = [
  {
    name: 'Dodaj projekt',
    description: 'Podziel się z innymi własnym projektem, pochawal się co udało Ci się uzyskać.',
    navigate: "CreateProject",
    gradientColors: ['rgb(12,154,188)', 'rgb(1, 191, 187)','rgb(1, 131, 107)', 'rgb(12, 157, 148)'],
    disabled: false,
    offersList: ["Podstawowe parametry samochodu", "Zdjęcia", "Soundcheck", "Modyfikacje"]
  },
  {
    name: 'Dodaj problem',
    description: 'Masz jakiś problem z samochodem? dodaj go tutaj, może akurat ktoś miał podobny problem i zna rozwiązanie',
    navigate: "CreateProblem",
    gradientColors:  ['rgb(131, 121, 27)', 'rgb(192,197,28)', 'rgb(112,114, 28)', 'rgb(151, 161, 17)'],
    disabled: false,
    offersList: ["Problem ogólny", "Problem konkretny", "Zdjęcia", "Kody błędów"]
  },
  {
    name: 'Dodaj spotkanie',
    description: '',
    navigate: "CreateMeeting",
    gradientColors: ['rgb(41, 51, 167)', 'rgb(12,127,208)', 'rgb(11, 71, 107)',  'rgb(12, 127,188)'],
    disabled: true,
    offersList: ["Ustawienie miejsca na mapie", "Zaproszenie innych osób"]
  },
]
const CreateScreen = () => {

  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const colorsProjectGradient = ['rgb(12,94,88)', 'rgb(1, 71, 67)','rgb(1, 131, 107)', 'rgb(12,57,48)']
  const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']
  const colorsMeetingGradient = ['rgb(22,94,108)', 'rgb(31, 71, 87)','rgb(41, 131, 167)', 'rgb(12,57,78)']
  
  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
       headerTitle: () =>  
        <View style={{alignItems:'center', flexDirection:'row'}}>
          <Image style={{width:35, height:35, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
          <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 7, fontWeight: '800'}}>Utwórz</Text>
        </View>,
       headerLeft: () => <View></View> ,
      //  headerRight: () => <_Icon_antDesign name='search1' size={21} color={theme.fontColor} style={{marginRight: 15}}/>

    })  
  }, [theme])


  return (
    <View style={[style.createContainer, {backgroundColor: theme.background}]}>
      {/* <TouchableOpacity activeOpacity={.6} style={style.createSection} onPress={() => navigation.navigate('CreateProject')}>
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
      </TouchableOpacity> */}

      {createOptions.map((data, i) => 
        <CreateItem data={data} key={i}/>
      )}
    </View>
  );
}

export default CreateScreen


