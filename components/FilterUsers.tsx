import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Icon } from '@rneui/base'
import _Icon from 'react-native-vector-icons/Entypo'
import { FlatList } from 'react-native'
import React, {useState} from 'react'
import { style } from '../screens/Profile/style'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { CarprojectData, User } from '../utils/types'

interface FilterUsersProps {
  users:User[] | null, 
  input:string, 
  edit?:boolean, 
//   setShowOptions: (value:{show:boolean, selectedProject: CarprojectData}) =>void, 
  showOptions:boolean,
//   setShowUsersList: (value: {show:boolean, users: User[] | null, headerText: string}) =>void
}

export const FilterUsers:React.FC<FilterUsersProps> = ({users, input, edit, showOptions}) => {
  const theme = useSelector(selectTheme)
  const [showList, setShowList] = useState<{header:string, persons:User[]}>()

  const searchFunction = () => {
    if(users){
        const updatedData = users.filter((item) => {
            const item_data = `${item.name.toUpperCase()})`;
            const text_data = input.toUpperCase();
            return item_data.indexOf(text_data) > -1
          });
        return updatedData
    }

    else {
        return null
    }
  };

  return (
    <FlatList
        data={searchFunction()}
        renderItem={({item})=> 
        <TouchableOpacity 
          style={style.renderItem} 
          // onPress={()=>navigation.navigate('Project', {car, author, createdAt})}
        >
            <Image style={[style.imageIcon, {borderColor:theme.backgroundContent}]} source={{uri:item.imageUri}}/>
            <View style={{marginHorizontal:15, flex:1}}>
                <Text style={{letterSpacing:1, color:theme.fontColor}}>{item.name}</Text>
            </View>
                      
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
