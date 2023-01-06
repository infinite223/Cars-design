import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Icon } from '@rneui/base'
import _Icon from 'react-native-vector-icons/Entypo'
import { FlatList } from 'react-native'
import React, {useState} from 'react'
import { style } from '../screens/Profile/style'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { Car, CarprojectData, Place, User, UserList } from '../utils/types'
import { useNavigation } from '@react-navigation/native';
import { setSelectedProject } from '../slices/selectedProject'
import { FieldValue } from 'firebase/firestore'

interface FilterProjectsProps {
  userProjects:CarprojectData[], 
  input:string, 
  edit?:boolean, 
  setShowOptions: (value:{show:boolean, selectedProject: CarprojectData}) =>void, 
  showOptions:boolean,
  setShowUsersList: (value: {show:boolean, users: UserList[] | null, headerText: string}) =>void
}

export const FilterProjects:React.FC<FilterProjectsProps> = ({userProjects, input, edit, setShowOptions, showOptions, setShowUsersList}) => {
  const theme = useSelector(selectTheme)
  const [showList, setShowList] = useState<{header:string, persons:User[]}>()
  const navigation:any = useNavigation()
  const dispatch = useDispatch()

  const searchFunction = () => {
    const updatedData = userProjects.filter((item) => {
      const item_data = `${item.car.model.toUpperCase()})`;
      const text_data = input.toUpperCase();
      return item_data.indexOf(text_data) > -1
    });

    return updatedData
  };

  const setProjectToNav = (id:string, car:Car, author:UserList, createdAt: FieldValue, place?:Place) => {

    dispatch(setSelectedProject({
      id, car, author, createdAt, place
    }))

    navigation.navigate('Project', {id, car, author, createdAt})
  }

  return (
    <FlatList
        data={searchFunction()}
        renderItem={({item: {id, car, author, createdAt, place}})=> 
        <TouchableOpacity 
          style={style.renderItem} 
          onPress={()=>setProjectToNav(id, car, author, createdAt, place)}
        >
            <Image style={[style.imageIcon, {borderColor:theme.backgroundContent}]} source={{uri:car.imagesCar[0].url}}/>
            <View style={{marginHorizontal:10, flex:1}}>
                <Text style={{letterSpacing:1, color:theme.fontColor}}>{car.CarMake}</Text>
                <Text style={{fontSize:13, color:theme.fontColorContent}}>{car.model}</Text>    
            </View>
            
            <TouchableOpacity onPress={() => setShowUsersList({show:true, users:car.likes, headerText:`${[{},{}].length} likes`})} style={[localStyle.likesConteiner, {backgroundColor: theme.backgroundContent}]}>
              <Text style={{fontSize:17, marginHorizontal:5, color:theme.fontColor}}>{car.likes.length}</Text>
              <Icon                 
                  name='heart'
                  type='evilicon'
                  size={28} 
                  color={theme.fontColor}
              />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>setShowOptions({show:!showOptions, selectedProject:  {id, car, author, createdAt}})} style={localStyle.optionsIcon}>
              <_Icon                            
                  name='dots-three-vertical'
                  size={18} 
                  color={theme.fontColor}
              />
            </TouchableOpacity>
            
        </TouchableOpacity>}
/>
  )
}

const localStyle = StyleSheet.create({
  optionsIcon: {
    paddingLeft:7,
    paddingVertical:3
  },
  likesConteiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingHorizontal:8,
    paddingVertical:5,
    borderRadius:35
  }
})
