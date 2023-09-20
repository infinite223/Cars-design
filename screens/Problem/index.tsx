import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { style } from './style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import { Icon } from '@rneui/base';
import { AlertProps, SpecyficProblemType, SuggestResolvedType } from '../../utils/types'
import { StatusProblem } from '../Problems/StatusProblem'
import _Icon_Feather from 'react-native-vector-icons/Feather'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import useAuth, { db } from '../../hooks/useAuth'
import { SuggestItem } from './SuggestItem'
import { v4 as uuid } from 'uuid';
import AlertModal from '../modals/AlertModal'
import { Image } from 'react-native'
import ImagesModal from '../modals/ImagesModal'
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('screen').width

export const ProblemScreen = () => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const route = useRoute<any>()
    const { user }:any = useAuth()
    const [suggestResolved, setSuggestResolved] = useState<SuggestResolvedType[]>([])
    const [alertModal, setAlertModal] = useState<AlertProps>({message:'', show:false, type:''})
    const [imagesModalVisible, setImagesModalVisible] = useState(false)
    const [selectImage, setSelectImage] = useState(0)
    const { data }:{data: SpecyficProblemType} = route.params;
    const [suggestText, setSuggestText] = useState('')
    const suggestsRef = collection(db, `problems/${data?.id}/suggests`)
    const [showSuggestInput, setShowSuggestInput] = useState(true)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => 
           <Text style={{ fontSize:18, color:theme.fontColor}}>
            {data.title.length>20?data.title.substring(0, 20)+ "...": data.title} 
           </Text>,
           headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:10}}>
                <Icon type="materialicon" name={'arrow-back-ios'} size={25} color={theme.fontColor}/>
            </TouchableOpacity> 
          )
        })  
    }, [theme])

    
  useEffect(() => {
    const unsubscribe = onSnapshot(suggestsRef, async (snapchot) => { 
        const allSuggests:any = snapchot.docs.map((doc, i)=> {
          return doc.data()
        })
        
        setSuggestResolved(allSuggests)
    })
    return () => {
      if(user) unsubscribe();
    };
  }, [])

      const sendSuggest = () => {
        const suggestId = uuid();

        if(suggestText.length>0){
          setDoc(doc(db, `problems/${data?.id}/suggests`, suggestId), 
          {
            id:suggestId, 
            solution:false, 
            text: suggestText, 
            likes:[], 
            comments: [], 
            author: {name: user.name, uid:user.uid, imageUri: user.imageUri}},
          ).then(() => {
            setAlertModal({message: 'Sugestia została dodana', show:true, type:'SUCCESS'})
            setSuggestText("")
          })
          .catch(() => {
            setAlertModal({message: 'Coś poszło nie tak', show:true, type:'ERROR'})
          })
        }
      } 

      const saveProblem = () => {

      }

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
      <ImagesModal 
        modalVisible={imagesModalVisible} 
        setModalVisible={setImagesModalVisible} 
        photos={data.imageUri.map((image) => {
          return (
            {url: image, place:{city: '', latitude: 0, longitude: 0}, likes:0}
          )
        })} 
        index={selectImage}
      />

      {alertModal.show&&<AlertModal {...alertModal} resetError={setAlertModal}/>}

      <View style={style.header}>
          <Text style={[style.titleText, {color: theme.fontColor}]}>{data.title}</Text>
          <StatusProblem showStatus={true} status={data.status}/>
      </View>
      <Text style={[style.descriptionText, {color: theme.fontColor}]}>{data.description}</Text>
      
       {data.imageUri.length>0&&
        <View style={{marginBottom: 20}}>
            <FlatList
              horizontal
              contentContainerStyle={{ height: 200}}
              data={data.imageUri}
              renderItem={({ item, index }) => 
              <TouchableOpacity activeOpacity={.6} onPress={()=>(setImagesModalVisible(true), setSelectImage(index))}>
                <Image 
                  style={{width: data.imageUri.length==1?screenWidth:270, height: 200}} 
                  source={{uri: item}}
                />
              </TouchableOpacity>
            }
            />
        </View>
        }

      <ScrollView style={{flex: 1, gap: 5}}>
        <Text style={{color: theme.fontColor, fontWeight: '300', fontSize: 12, marginBottom: 4}}>Sugerowane rozwiązania:</Text>
        
        {suggestResolved.map((suggest, i) => 
          <SuggestItem problemId={data.id} setAlertModal={setAlertModal} suggest={suggest} key={i} setShowSuggestInput={setShowSuggestInput}/>
        )}
        
      </ScrollView>    
      {showSuggestInput&&<View style={[style.footer, {backgroundColor: theme.backgroundContent}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={saveProblem} style={{padding: 5}}>
            <_Icon_Feather name={'download'} size={20} color={theme.fontColor} style={{ marginRight: 0 }}/>
          </TouchableOpacity>

          <TextInput
            style={{color: theme.fontColor, marginHorizontal: 15}}
            placeholderTextColor={theme.fontColorContent} 
            placeholder='Zaproponuj rozwiązanie'
            value={suggestText}
            onChangeText={setSuggestText}
          />
        </View>
        <TouchableOpacity onPress={sendSuggest} style={{padding: 5}}>
         <_Icon_Ionicons name={'send-outline'} size={20} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>}
    </View>
  )
}

