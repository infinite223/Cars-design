import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Icon } from '@rneui/base'
import _Icon from 'react-native-vector-icons/Entypo'
import { FlatList } from 'react-native'
import React, {useState} from 'react'
import { style } from '../screens/Profile/style'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { CarprojectData, User } from '../utils/types'

interface FilterProjectsProps {
  userProjects:CarprojectData[], 
  input:string, 
  edit?:boolean, 
  setShowOptions: (value:{show:boolean, selectedProject: CarprojectData}) =>void, 
  showOptions:boolean
}

export const FilterProjects:React.FC<FilterProjectsProps> = ({userProjects, input, edit, setShowOptions, showOptions}) => {
  const theme = useSelector(selectTheme)
  const [showList, setShowList] = useState<{header:string, persons:User[]}>()

  const searchFunction = () => {
    const updatedData = userProjects.filter((item) => {
      const item_data = `${item.car.model.toUpperCase()})`;
      const text_data = input.toUpperCase();
      return item_data.indexOf(text_data) > -1
    });

    return updatedData
  };

  return (
    <FlatList
        data={searchFunction()}
        renderItem={({item: {id, car, author, createdAt}})=> 
        <TouchableOpacity 
          style={style.renderItem} 
          // onPress={()=>navigation.navigate('Project', {car, author, createdAt})}
        >
            <Image style={[style.imageIcon, {borderColor:theme.backgroundContent}]} source={{uri:car.imagesCar[0].url}}/>
            <View style={{marginHorizontal:10, flex:1}}>
                <Text style={{letterSpacing:1, color:theme.fontColor}}>{car.CarMake}</Text>
                <Text style={{fontSize:13, color:theme.fontColorContent}}>{car.model}</Text>    
            </View>
            
            <TouchableOpacity onPress={()=> setShowList({header: 'likes', persons: []})} style={[localStyle.likesConteiner, {backgroundColor: theme.backgroundContent}]}>
              <Text style={{fontSize:17, marginHorizontal:5, color:theme.fontColor}}>{car.likes}</Text>
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
