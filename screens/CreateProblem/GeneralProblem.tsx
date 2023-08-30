import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectTheme } from '../../slices/themeSlice'
import CustomInput from '../../components/CustomInput'
import { globalStyles } from '../../utils/globalStyles'

const GeneralProblem = () => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const [title, setTitle] = useState('')
  const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']

  return (
    <ScrollView style={localStyles.container} contentContainerStyle={{justifyContent: 'space-between', height: 900}}>
      <View style={{flex: 1}}>
        <Text style={[localStyles.headerText, { color: theme.fontColorContent }]}>
          Problem ogólny dotyczy całkowicie niezidentyfikowanej przyczyny problemu, usterki, żadnego tropu lub awaria jest rozległa.
        </Text>
        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Uzupełnij podstawowe dane</Text>
        <CustomInput placeholder='Tytuł problemu' setValue={setTitle} value={title} helpText='np. Problem z doładowaniem, 2.0tsi' />
        <TextInput 
            placeholder='Opis problemu...'
            placeholderTextColor={theme.fontColorContent}
            multiline
            style={{color: theme.fontColor, textAlignVertical:'top', fontSize: 16, padding: 15, marginVertical:10, borderColor: theme.backgroundContent, borderWidth:1}}
            numberOfLines={10}
        />
        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Dodaj zdjęcie</Text>
      </View>

      <TouchableOpacity style={localStyles.button}>
        <Text style={localStyles.buttonText}>Utwórz problem ogólny</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default GeneralProblem

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {

  },
  text: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
      // backgroundColor: 'gray'
  },
  button: {
    backgroundColor: globalStyles.background_1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    marginBottom: 10
  },
  buttonText: {
    fontSize:16,
    letterSpacing:0,
    paddingHorizontal:7,
    marginRight:5,
    fontWeight:'700',
    textTransform: 'uppercase',
    color: 'white'
  }
})