import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { style } from './style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import { Icon } from '@rneui/base';
import { SpecyficProblemType, SuggestResolvedType } from '../../utils/types'
import { StatusProblem } from '../Problems/StatusProblem'
import _Icon_Feather from 'react-native-vector-icons/Feather'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'
import { collection, onSnapshot } from 'firebase/firestore'
import useAuth, { db } from '../../hooks/useAuth'
import { SuggestItem } from './SuggestItem'

export const ProblemScreen = () => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const route = useRoute<any>()
    const { user }:any = useAuth()
    const [suggestResolved, setSuggestResolved] = useState<SuggestResolvedType[]>([])

    const { data }:{data: SpecyficProblemType} = route.params;
    const isMyProblem = user.uid === data?.author.uid
    const [showOptions, setShowOptions] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showChangeStatus, setShowChangeStatus] = useState(false)
    const [suggestText, setSuggestText] = useState('')
    const suggestsRef = collection(db, `problems/${data?.id}/suggests`)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => 
           <Text style={{ fontSize:18, color:theme.fontColor}}>
            {data.title.length>20?data.title.substring(0, 20)+ "...": data.title} 
           </Text>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:5}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
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
        // 
      } 

      const addComment = () => {

      }

      const saveProblem = () => {

      }

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
        <View style={style.header}>
            <Text style={[style.titleText, {color: theme.fontColor}]}>{data.title}</Text>
            <StatusProblem showStatus={true} status={data.status}/>
        </View>
      <Text style={[style.descriptionText, {color: theme.fontColor}]}>{data.description}</Text>
      <ScrollView style={{flex: 1, gap: 5}}>
        <Text style={{color: theme.fontColorContent}}>Sugerowane rozwiązania:</Text>
        {suggestResolved.map((suggest) => 
          <SuggestItem suggest={suggest}/>
        )}
        
      </ScrollView>    
      <View style={[style.footer, {backgroundColor: theme.backgroundContent}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={saveProblem} style={{padding: 5}}>
            <_Icon_Feather name={'download'} size={20} color={theme.fontColor} style={{ marginRight: 0 }}/>
          </TouchableOpacity>

          <TextInput
            style={{color: theme.fontColor, marginHorizontal: 15}}
            placeholderTextColor={theme.fontColorContent} 
            placeholder='Zaproponuj rozwiązanie'
          />
        </View>
        <TouchableOpacity onPress={sendSuggest} style={{padding: 5}}>
         <_Icon_Ionicons name={'send-outline'} size={20} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

