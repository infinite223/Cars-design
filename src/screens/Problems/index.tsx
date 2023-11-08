import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import _Icon_Entypo from 'react-native-vector-icons/Entypo'
import { style } from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import useAuth, { db } from '../../hooks/useAuth'
import { collection, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore'
import { ProblemItem } from './ProblemItem'
import { ProblemsCategoryData, SpecyficProblemType } from '../../utils/types'
import { Image } from 'react-native'
import { globalStyles } from '../../utils/globalStyles'
import SelectList from 'react-native-dropdown-select-list'
import { Icon } from '@rneui/base'
import _Icon_antDesign from 'react-native-vector-icons/AntDesign'

export const ProblemsScreen = () => {
    const theme = useSelector(selectTheme)
    const navigation:any = useNavigation()
    const { user }:any = useAuth()
    const [problemsState, setProblemsState] = useState<SpecyficProblemType[]>([])
    const problemRef = collection(db, 'problems')
    const [selectedOption, setSelectedOption] = useState(0)
    const [category, setCategory] = useState<string>('')
    const [errorCode, setErrorCode] = useState<string>('')
  
    const errorText:any = []

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () =>  <View style={{alignItems:'center', flexDirection:'row'}}>
           <Image style={{width:40, height:40, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
           <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 15, fontWeight: '800'}}>Problemy</Text>
         </View>,
          headerRight: () => 
          <TouchableOpacity style={{paddingHorizontal:15, paddingVertical:5}} onPress={() => navigation.navigate('CreateProblem')}>
            <_Icon_Entypo name={'plus'} size={26} color={theme.fontColor} style={{ marginRight: 0 }}/>
          </TouchableOpacity>
        })  
      }, [theme])

      useEffect(() => {
        if(user){
            const unsubscribe = onSnapshot( query(problemRef, where('type', '==', !selectedOption?'General':'Specyfic')), async (snapchot) => { 
            
              const allProblems:any = snapchot.docs.map((doc, i)=> {
                return doc.data()
              })
              console.log(allProblems)
              setProblemsState(allProblems)

            return () => {
              if(user) unsubscribe();
            };
          })
        }
      }, [selectedOption])

  const searchProblems = async () => {
    let problemssQuery = query(problemRef, where('type', '==', 'Specyfic'))
    const findCategoryType = ProblemsCategoryData.find((_category) => _category.name === category)?.type

    if(user){
      console.log(category)

      if(category==='kategoria' && errorCode.length<1) return
      if(errorCode.length>1 && category!=='kategoria') {
        problemssQuery = query(problemRef, 
          where('type', '==', 'Specyfic'), 
          where('category', '==', findCategoryType),
          where("errorCodes", "array-contains", errorText))
      }
      if(errorCode.length<1 && category!=='kategoria'){
        problemssQuery = query(problemRef, where('type', '==', 'Specyfic'), where('category', '==', findCategoryType))
      }
      if(errorCode.length>1) {
        problemssQuery = query(problemRef, where('type', '==', 'Specyfic'),where("errorCodes", "array-contains", errorText))
      }
      
      await getDocs(problemssQuery).then((docs) => {
        if(docs.empty){
          console.log('Nie znaleziono problemów')
          setProblemsState([])
        }
        else {
          console.log(docs.docs.map((doc:any, i:any)=> {
            return doc.data()
          }))

          setProblemsState(docs.docs.map((doc:any, i:any)=> {
            return doc.data()
          }))
        }
      })
    }
  }
      
  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
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

      {selectedOption===1&&
        <View>
          <SelectList    
            searchPlaceholder={"Wybierz kategorie"}
            searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
            placeholder={'Wybierz kategorie'} 
            setSelected={(selectedCategory:any)=> setCategory(selectedCategory)} 
            boxStyles={{borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:-5, paddingBottom:10, marginBottom:5}}
            inputStyles={{color: category.length>1?theme.fontColor:theme.fontColorContent, fontSize:16, marginLeft:-9}}
            dropdownTextStyles={{color: theme.fontColor, marginLeft:-10}}
            dropdownStyles={{borderBottomWidth:1, borderWidth:0, borderColor: theme.backgroundContent, marginLeft:5, marginBottom:5}}  
            data={ProblemsCategoryData.map((category, i) => {
              return {key: category.name, value: category.name}
            })} 
        />
        </View>
      }

      {selectedOption===1&&
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            placeholder='Szukaj po kodzie błędu'
            value={errorCode}
            onChangeText={setErrorCode}
            style={[style.errorCodeInput, {borderColor: theme.backgroundContent, color: theme.fontColor}]}
            placeholderTextColor={theme.fontColorContent}
          />
          <TouchableOpacity 
            onPress={searchProblems}
            style={[style.searchButton, {backgroundColor: theme.backgroundContent}]}
          >
            <Text style={[style.searchText, {color: theme.fontColor}]}>Szukaj</Text>
            <_Icon_antDesign name='search1' size={14} color={theme.fontColor}/>
          </TouchableOpacity>
        </View>
      }

      <ScrollView contentContainerStyle={{gap: 10}}>
        {problemsState.map((data) => 
          <ProblemItem data={data}/>
        )}
      </ScrollView>
    </View>
  )
}
