import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions, FlatList} from 'react-native'
import React, { FC, useState } from 'react'
import { ProblemsCategoryData, SpecyficProblemType } from '../../utils/types'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import useAuth, { db } from '../../hooks/useAuth'
import { setLoading } from '../../slices/loadingSlice'
import { Icon } from '@rneui/base'
import { globalStyles } from '../../utils/globalStyles'
import CustomInput from '../../components/CustomInput'
import { chooseImg } from '../../utils/functions/chooseImg'
import { style } from './style'
import { v4 as uuid } from 'uuid';
import SelectList from 'react-native-dropdown-select-list'
import { LinearGradient } from 'expo-linear-gradient'

const widthScreen = Dimensions.get('window').width

interface CreateProblemSctionProps {
  setAlertModal: (vlue: {message:string, show:boolean, type:'ERROR' | 'SUCCESS'}) => void
}

const SpecyficProblem:FC<CreateProblemSctionProps> = ({ setAlertModal }) => {
  const navigation:any = useNavigation()
  const theme = useSelector(selectTheme)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const colorsProblemGradient = ['rgb(102,94,48)', 'rgb(81, 71, 17)','rgb(141, 131, 27)', 'rgb(62,57,28)']
  const [images, setImages] = useState<any[]>([]);
  const [errorCodes, setErrorCodes] = useState<string[]>([])
  const { user }:any = useAuth()
  const dispatch = useDispatch()

  const createProblem = async () => {
      dispatch(setLoading(true))
      const problemId = uuid();
      const findCategoryType = ProblemsCategoryData.find((_category) => _category.name === category)?.type
      const problemData:SpecyficProblemType = {
        author: user,
        category:findCategoryType?findCategoryType:'other',
        date: Timestamp.now(),
        description: '',
        errorCodes,
        id: '',
        imageUri: [],
        status:'Unresolved',
        title: '',
        type: 'General',
    }

    await setDoc(doc(db, 'problems', problemId), problemData).then(() => {
      setAlertModal({message: 'Problem został pomyślnie dodany', show:true, type:'SUCCESS'})
      dispatch(setLoading(false))
    }).catch((e) => {
      console.log(e)
      setAlertModal({message: 'Coś poszło nie tak', show:true, type:'ERROR'})
      dispatch(setLoading(false))
    })
    dispatch(setLoading(false))
  }
  
  const colorsGradient = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

  const validData = () => {
    if(title.length < 4) setAlertModal({message: 'Tytuł musi być dłuższy', show:true, type:'ERROR'})
    if(description.length < 4) setAlertModal({message: 'Opis musi być dłuższy', show:true, type:'ERROR'})
    else createProblem
  }
  const [category, setCategory] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')

  return (
    <ScrollView style={localStyles.container} contentContainerStyle={{justifyContent: 'space-between', height: 900}}>
      <View style={{flex: 1}}>
        <Text style={[localStyles.headerText, { color: theme.fontColorContent }]}>
        Problem konkretny dotyczy precyzyjnie opisany problem z konkretnym elementem samochodu. Najczęściej już po wstępnej diagnostyce i ze znanymi kodami błędów.
        </Text>
        <SelectList    
            searchPlaceholder={"Wybierz kategorie"}
            searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
            placeholder={'Wybierz kategorie'} 
            setSelected={(selectedCategory:any)=> setCategory(selectedCategory)} 
            boxStyles={{borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:-5, paddingBottom:10, marginBottom:5}}
            inputStyles={{color: category.length>1?theme.fontColor:theme.fontColorContent, fontSize:16, marginLeft:-9}}
            dropdownTextStyles={{color: theme.fontColor, marginLeft:-10}}
            dropdownStyles={{borderBottomWidth:1, borderWidth:0, borderColor: theme.backgroundContent, marginLeft:-5, marginBottom:5}}  
            data={ProblemsCategoryData.map((category, i) => {
              return {key: category.name, value: category.name}
            })} 
        />
        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Uzupełnij podstawowe dane</Text>
        <CustomInput placeholder='Tytuł problemu' setValue={setTitle} value={title} helpText='np. Problem z doładowaniem, 2.0tsi' />
        <TextInput 
            placeholder='Opis problemu...'
            placeholderTextColor={theme.fontColorContent}
            multiline
            style={{color: theme.fontColor, textAlignVertical:'top', fontSize: 16, padding: 15, marginVertical:10, borderColor: theme.backgroundContent, borderWidth:1}}
            numberOfLines={10}
        />

        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Dodaj kody błędów</Text>
        <View style={{flexDirection: 'row', alignItems:'center', marginVertical:15}}>
          <View
            style={[localStyles.addButton, localStyles.addErrorCode, {height: 50, backgroundColor: theme.backgroundContent}]}
          >
            <TextInput 
              onChangeText={setInputText}
              value={inputText}
              style={[{color: theme.fontColor}]}
              placeholderTextColor={theme.fontColorContent} 
              placeholder='Error code'
            />
            <TouchableOpacity 
              style={{paddingHorizontal: 5}}
              onPress={(text) => inputText.length>0&&setErrorCodes([...errorCodes, inputText])}
            >
              <Icon type='entypo' name="plus" size={20} color={theme.fontColor}/>
            </TouchableOpacity>
          </View>

          <FlatList
            data={errorCodes}
            horizontal
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => 
            <TouchableOpacity onLongPress={() => setErrorCodes(errorCodes.filter((code) => code !== item))} style={[localStyles.errorCode, {backgroundColor: theme.backgroundContent}]}>
              <Text style={[{color: theme.fontColor}]}>
                {item}
              </Text>
            </TouchableOpacity>}
          />
        </View>


        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Dodaj zdjęcie</Text>
      
        <View style={{marginVertical: 15, flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity disabled={images.length>=1} onPress={()=>chooseImg(images, setImages)} style={[localStyles.addButton,  {height:50, backgroundColor: theme.backgroundContent, opacity:images.length>=1?.5:1}]}>            
            <Icon type='entypo' name="plus" size={20} color={theme.fontColor}/>
          </TouchableOpacity>
          <View>
            <Image source={{ uri: images[0]?.uri }} style={{ width: widthScreen / 2.2, height: 120, marginStart:5, borderRadius:5 }} />

            {images.length>0&&<TouchableOpacity onPress={()=>setImages([])} style={{position:'absolute', top:5, right:5, padding:4, backgroundColor:'rgba(0,0,0, .6)', borderRadius:5}}>                         
                <Icon type='entypo' name="minus" size={20} color={theme.fontColor}/>
            </TouchableOpacity>}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={createProblem}>
        <LinearGradient
          colors={[colorsGradient[3], colorsGradient[1], colorsGradient[1], colorsGradient[3]]}
          locations={[0, 0.25, 0.45, 1]}
            start={[0, 0]}   
            end={[1, 0]}   
            style={localStyles.button}
          >
          <Text style={localStyles.buttonText}>Utwórz problem konkretny</Text>
        </LinearGradient>
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
    borderRadius: 50
  },
  addButton: {
    borderRadius:50,
    paddingHorizontal:15,
    paddingVertical:15
  },
  errorCode: {
    borderRadius: 50, 
    padding:15
  },
  addErrorCode: {
    flexDirection:'row',
    alignItems: 'center',
    gap:10,
    marginRight:10
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    marginBottom: 10
  },
  buttonText: {
    fontSize:15,
    letterSpacing:0,
    paddingHorizontal:7,
    marginRight:5,
    fontWeight:'700',
    color: 'white'
  }
})