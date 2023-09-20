import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import SelectList from 'react-native-dropdown-select-list'
import { getMakes } from '../../utils/functions/getMakes';
import { findMakeInCategores } from '../../utils/functions/findMakeInCaategores';
import _Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomInput from './../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { collectionGroup, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import { setSelectedProject } from '../../slices/selectedProject';
import { CarprojectData } from '../../utils/types';
import Carproject from '../../components/Carproject';

const SearchScreen = () => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const [makesCategory, setMakesCategory] = useState<{key:number, value:string}[]>([])
    const [carMake, setCarMake] = useState('')
    const [model, setModel] = useState('')
    const [searchingProjects, setSearchingProjects] = useState<any>([])
    const language = useSelector(selectLanguage)
    const dispatch = useDispatch()
    const { headerText, placeholder: { carMakeText, modelText } } = translations.screens.Search

    useLayoutEffect(() => { 
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () =>  
           <View style={[{ alignItems:'center', flexDirection:'row'}]}>
             <Image style={{width:40, height:40, marginLeft:-10, borderRadius: 10}} source={require('./../../assets/iconApp_1.png')}/>
             <Text style={{fontSize:18 ,color: theme.fontColor, marginLeft: 7, fontWeight: '800'}}>Szukaj projektów</Text>
           </View>,
          headerLeft: () => <View></View> ,
        })  
    }, [theme])

    useEffect(() => {
      getMakes(setMakesCategory)
    }, [])

  useEffect(()=> {  
    const projectsRef = collectionGroup(db, 'projects')
    const projectsQuery = query(
      projectsRef, 
      limit(5), 
      carMake.length>1?where("car.CarMake", "==", carMake):limit(5),
      model.length>1?where("car.model", "==", model):limit(5)
    )
     const unsubscribe = onSnapshot(projectsQuery, (snapchot) => {
        setSearchingProjects(snapchot.docs.map((doc, i)=> {
          return doc.data()
        }))    
        if(snapchot.empty){
          setSearchingProjects([])
        }
     })
     return unsubscribe
  }, [carMake, model])

  const setProjectToNav = ({id, author, car, createdAt, place}:CarprojectData) => {

    dispatch(setSelectedProject({
      id, car, author, createdAt, place
    }))

    navigation.navigate('Project', {id, car, author, createdAt})
  }
  
  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
      <FlatList
        ListHeaderComponent={() =>      
          <View style={[style.searchContainer]}>
            {makesCategory&&
                <SelectList    
                    searchPlaceholder={'s'}
                    searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
                    placeholder={carMakeText[language as keyof typeof carMakeText]} 
                    setSelected={(selectNumber:any)=>setCarMake(findMakeInCategores(selectNumber, makesCategory))} 
                    boxStyles={{ borderWidth:0, borderBottomWidth:0, borderColor:theme.backgroundContent, marginHorizontal:-15, paddingBottom:0, marginBottom:5}}
                    inputStyles={{color: theme.fontColor, fontSize:15, marginLeft:-9}}
                    dropdownStyles={{borderBottomWidth:1, borderWidth:0, borderColor: theme.backgroundContent, marginLeft:-5, marginBottom:5}}  
                    dropdownTextStyles={{color: theme.fontColor, marginLeft:-10}}
                    data={makesCategory} 
                    // badgeStyles={{color:'white'}}
                    arrowicon={<_Icon_MaterialIcons name="keyboard-arrow-down" size={22} color={theme.fontColor} style={{alignSelf:'center', left:5}}/>} 
                />
            }

            <View style={{marginHorizontal:-8, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <CustomInput placeholder={modelText[language as keyof typeof modelText]} setValue={setModel} fontSize={15}/>
              <Icon type="feather" name="search" color={theme.fontColor} size={18} style={{marginRight:11}}/>
            </View>
          </View>
        }
        stickyHeaderHiddenOnScroll
        style={{flex:1}}
        data={searchingProjects}
        renderItem={({item})=> {
          return (
            <Carproject data={item}/>
          )
        }}
      />
    </View>
  )
}

export default SearchScreen

