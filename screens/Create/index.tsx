import { View, Text, StatusBar } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectTheme } from '../../slices/themeSlice'
import { style } from './style'
import CreateItem from './CreateItem'
import { Image } from 'react-native'
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'
const gradeintColors = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props:any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
const createOptions = [
  {
    name: 'Projekt',
    description: 'Podziel się z innymi własnym projektem, pochawal się co udało Ci się uzyskać.',
    navigate: "CreateProject",
    gradientColors:gradeintColors,
    disabled: false,
    offersList: ["Podstawowe parametry samochodu", "Zdjęcia", "Soundcheck", "Modyfikacje"]
  },
  {
    name: 'Problem',
    description: 'Masz jakiś problem z samochodem? dodaj go tutaj, może akurat ktoś miał podobny problem i zna rozwiązanie',
    navigate: "CreateProblem",
    gradientColors: gradeintColors,
    disabled: false,
    offersList: ["Problem ogólny", "Problem konkretny", "Zdjęcia", "Kody błędów"]
  },
  {
    name: 'Spotkanie',
    description: '',
    navigate: "CreateMeeting",
    gradientColors: gradeintColors,
    disabled: true,
    offersList: ["Ustawienie miejsca na mapie", "Zaproszenie innych osób"]
  },
]
const CreateScreen = (props:any) => {

  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const colorsGradient_2 = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']
  
  useLayoutEffect(() => {
    navigation.setOptions({
       headerBackVisible:false,
      
       headerTitle: () =>  
        <View style={{left: -12,alignItems:'center', flexDirection:'row', backgroundColor: colorsGradient_2[3], flex:1, width: 500}}>
          <Image style={{width:40, height:40, marginLeft: 4, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
          <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 7, fontWeight: '800'}}>Wybierz co chcesz dodać</Text>
        </View>,
    })  
  }, [theme])

  return (
    <View style={[style.createContainer, {backgroundColor: theme.background}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor={colorsGradient_2[3]} />

      {createOptions.map((data, i) => 
        <CreateItem data={data} key={i}/>
      )}
    </View>
  );
}

export default CreateScreen


