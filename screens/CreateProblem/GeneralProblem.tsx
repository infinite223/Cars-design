import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import CustomInput from '../../components/CustomInput'
import { globalStyles } from '../../utils/globalStyles'
import { Icon } from '@rneui/themed';
import { chooseImg } from '../../utils/functions/chooseImg'
import { style } from './style'
import { GeneralProblemType } from '../../utils/types'
import { setLoading } from '../../slices/loadingSlice'
import { v4 as uuid } from 'uuid';
import useAuth, { db } from '../../hooks/useAuth'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { uploadImage } from '../../firebase/uploadImage'
import { LinearGradient } from 'expo-linear-gradient'

const widthScreen = Dimensions.get('window').width

interface CreateProblemSctionProps {
  setAlertModal: (vlue: {message:string, show:boolean, type:'ERROR' | 'SUCCESS'}) => void
}

const GeneralProblem:FC<CreateProblemSctionProps> = ({setAlertModal}) => {
  const theme = useSelector(selectTheme)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<any[]>([]);
  const { user }:any = useAuth()
  const dispatch = useDispatch()
  const firebaseImagesStagesUriUpload = (uri:string, image:any) => {}
  
  const createProblem = async () => {
    dispatch(setLoading(true))
    const problemId = uuid();
      let firebaseImagesUri:string[] = []

      const firebaseImagesUriUpload = (uri:string, image:any) => {
          firebaseImagesUri.push(uri)
      }

      let uploadAllImages = new Promise(function (resolve, reject){
          images.forEach((image:any, id) => {
            uploadImage(image, '', false, user.uid, firebaseImagesStagesUriUpload, (value: any) => {})
          .then((promise:any)=> {firebaseImagesUriUpload(promise.url, promise.image); console.log(promise)})  
          .catch(() => setAlertModal({type:'ERROR', show:true, message: 'error'})) 
          .finally(()=> {
            if(id===firebaseImagesUri.length-1){
                resolve('Promise resolved'); 
            }
        })        
       })   
      })

    const problemData:GeneralProblemType = {
        author: {name: user.name, imageUri: user.imageUri, uid: user.uid},
        date: Timestamp.now(),
        description,
        id: problemId,
        imageUri: firebaseImagesUri,
        status:'Unresolved',
        title,
        type: 'General',
    }
    console.log(firebaseImagesUri, '2')
    let result = await uploadAllImages; 
    
    if(result){
      await setDoc(doc(db, 'problems', problemId), problemData).then(() => {
        setAlertModal({message: 'Problem został pomyślnie dodany', show:true, type:'SUCCESS'})
        dispatch(setLoading(false))
      }).catch((e) => {
        console.log(e)
        setAlertModal({message: 'Coś poszło nie tak', show:true, type:'ERROR'})
        dispatch(setLoading(false))
      })
    }

    dispatch(setLoading(false))
  }
  const colorsGradient = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

  const validData = () => {
    if(title.length < 4) setAlertModal({message: 'Tytuł musi być dłuższy', show:true, type:'ERROR'})
    if(description.length < 4) setAlertModal({message: 'Opis musi być dłuższy', show:true, type:'ERROR'})
    else createProblem()
  }

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
            onChangeText={setDescription}
            value={description}
        />
        <Text style={[localStyles.text, { color: theme.fontColor, backgroundColor: theme.backgroundContent }]}>Dodaj zdjęcie</Text>
        
        <View style={{marginVertical: 15, flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity disabled={images.length>=1} onPress={()=>chooseImg(images, setImages)} style={[localStyles.addButton, {height:50, backgroundColor: theme.backgroundContent, opacity:images.length>=1?.5:1}]}>            
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

      <TouchableOpacity onPress={validData}>
      <LinearGradient
          colors={[colorsGradient[3], colorsGradient[1], colorsGradient[1], colorsGradient[3]]}
          locations={[0, 0.25, 0.45, 1]}
            start={[0, 0]}   
            end={[1, 0]}   
            style={localStyles.button}
          >
        <Text style={localStyles.buttonText}>Utwórz problem ogólny</Text>
        </LinearGradient>
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
    marginBottom: 5
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 25
  },
  addButton: {
    borderRadius:50,
    paddingHorizontal:15,
    paddingVertical:15
  },
  button: {
    // backgroundColor: globalStyles.background_1,
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
    // textTransform: 'uppercase',
    color: 'white'
  }
})