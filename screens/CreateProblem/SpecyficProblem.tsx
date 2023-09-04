import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { SpecyficProblemType } from '../../utils/types'
import { Timestamp } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import useAuth from '../../hooks/useAuth'
import { setLoading } from '../../slices/loadingSlice'
import { Icon } from '@rneui/base'
import { globalStyles } from '../../utils/globalStyles'
import CustomInput from '../../components/CustomInput'
import { chooseImg } from '../../utils/functions/chooseImg'
import { style } from './style'

const widthScreen = Dimensions.get('window').width

const SpecyficProblem = () => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const [title, setTitle] = useState('')
  const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']
  const [images, setImages] = useState<any[]>([]);
  const { user }:any = useAuth()
  const dispatch = useDispatch()

  const createProblem = () => {
      dispatch(setLoading(true))
      const problemData:SpecyficProblemType = {
        author: user,
        category:'Engine',
        date: Timestamp.now(),
        description: '',
        errorCodes: [],
        id: '',
        imageUri: [],
        status:'Unresolved',
        title: '',
        type: 'General',
    }
  }

  return (
    <ScrollView style={localStyles.container} contentContainerStyle={{justifyContent: 'space-between', height: 900}}>
      <View style={{flex: 1}}>
        <Text style={[localStyles.headerText, { color: theme.fontColorContent }]}>
        Problem konkretny dotyczy precyzyjnie opisany problem z konkretnym elementem samochodu. Najczęściej już po wstępnej diagnostyce i ze znanymi kodami błędów.
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
        
        <View style={{marginVertical: 15, flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity disabled={images.length>=1} onPress={()=>chooseImg(images, setImages)} style={[style.addImageButton, {backgroundColor: theme.backgroundContent, opacity:images.length>=1?.5:1}]}>            
            <Icon type='entypo' name="plus" size={30} color={theme.fontColor}/>
          </TouchableOpacity>
          <View>
            <Image source={{ uri: images[0]?.uri }} style={{ width: widthScreen / 2.2, height: 120, marginStart:5, borderRadius:5 }} />

            {images.length>0&&<TouchableOpacity onPress={()=>setImages([])} style={{position:'absolute', top:5, right:5, padding:4, backgroundColor:'rgba(0,0,0, .6)', borderRadius:5}}>                         
                <Icon type='entypo' name="minus" size={20} color={theme.fontColor}/>
            </TouchableOpacity>}
          </View>
        </View>
      </View>

      <TouchableOpacity style={localStyles.button} onPress={createProblem}>
        <Text style={localStyles.buttonText}>Utwórz problem konkretny</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default SpecyficProblem

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    marginBottom: 5
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 25
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