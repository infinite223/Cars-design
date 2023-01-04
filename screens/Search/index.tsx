import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from '@rneui/base';
import { CircleData } from '../../components/CircleData';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosTab from '../../components/ProjectScreenTabs/PhotosTab';
import HistoryTab from '../../components/ProjectScreenTabs/HistoryTab';
import { getColorsCircle } from './../../utils/functions/colorsCircle';
import { onShare, likeProject } from '../../utils/functions/projectFunctions';
import ChatModal from './../modals/ChatModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import SelectList from 'react-native-dropdown-select-list'
import { getMakes } from '../../utils/functions/getMakes';
import { findMakeInCategores } from '../../utils/functions/findMakeInCaategores';
import _Icon_FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomInput from './../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { collectionGroup, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
const widthScreen = Dimensions.get('window').width

const SearchScreen = () => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const [makesCategory, setMakesCategory] = useState<{key:number, value:string}[]>([])
    const [carMake, setCarMake] = useState('')
    const [model, setModel] = useState('')
    const [searchingProjects, setSearchingProjects] = useState<any>([])
    const language = useSelector(selectLanguage)
    const { headerText } = translations.screens.Search
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () =>  <Text style={{ marginLeft:5, fontSize:20, letterSpacing:1, fontWeight:'500', color:theme.fontColor}}>
            {headerText[language as keyof typeof headerText]}
           </Text>,
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
  
  return (
    <View style={{flex:1, backgroundColor: theme.background}}>
      <View style={[style.searchContainer, {backgroundColor: theme.backgroundContent}]}>
        {makesCategory&&
            <SelectList    
                searchPlaceholder={'s'}
                searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
                placeholder={'Choose car make'} 
                setSelected={(selectNumber:any)=>setCarMake(findMakeInCategores(selectNumber, makesCategory))} 
                boxStyles={{ borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:0, paddingBottom:0, marginBottom:5}}
                inputStyles={{color: carMake.length>1?theme.fontColor:theme.fontColor, fontSize:16, marginLeft:-9}}
                dropdownTextStyles={{color: theme.fontColor, marginLeft:0}}
                dropdownStyles={{borderBottomWidth:1, borderWidth:0, borderColor: theme.backgroundContent, marginLeft:0, marginBottom:5}}  
                data={makesCategory} 
                badgeStyles={{color:'white'}}
                arrowicon={<_Icon_FontAwesome name="chevron-down" size={15} color={theme.fontColor} style={{alignSelf:'center'}}/>} 
            />
        }

        <View style={{marginHorizontal:5, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <CustomInput placeholder='Type model' setValue={setModel} fontSize={15}/>
          {/* <TouchableOpacity style={[style.searchButton, {backgroundColor: "#273"}]}>
            <Text style={[{color: theme.fontColor}]}>Search</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <FlatList
        style={{flex:1}}
        data={searchingProjects}
        renderItem={({item})=> {
          return (
            <TouchableOpacity style={[style.searchItem]}>
              <View style={{alignItems:'center', flexDirection:'row'}}>
                <Image style={style.imageCar} source={{uri: item.car.imagesCar[0].url}}/>
                <View style={{marginHorizontal:10}}>
                  <Text style={[style.model, {color: theme.fontColor}]}>{item.car.model}</Text>
                  <Text style={[style.carMake, {color: theme.fontColorContent}]}>{item.car.CarMake}</Text>
                </View>
              </View>
              <View>
                <View style={style.performanceContainer}>
                <Text style={[style.performanceValue, {color: getColorsCircle(item.car.performance[0].value, item.car.performance[0].type)[0]}]}>
                  {item.car.performance[0].value+ " "}
                </Text>
                <Text style={[style.performanceType, {color: theme.fontColor}]}>{item.car.performance[0].type}</Text>
              </View>
              <View style={style.performanceContainer}>
                <Text style={[style.performanceValue, {color: getColorsCircle(item.car.performance[1].value, item.car.performance[1].type)[0]}]}>
                  {item.car.performance[1].value + " "}
                </Text>
                <Text style={[style.performanceType, {color: theme.fontColor}]}>{item.car.performance[1].type}</Text>
              </View>
                </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default SearchScreen

