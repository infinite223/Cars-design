import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Icon } from '@rneui/base'
import { FlatList } from 'react-native'
import React from 'react'
import { style } from '../screens/Profile/style'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { CarprojectData } from '../utils/types'

export const FilterProjects:React.FC<{userProjects:CarprojectData[], input:string}> = ({userProjects, input}) => {
  const theme = useSelector(selectTheme)

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
        renderItem={({item: {car, author, createdAt}})=> 
        <TouchableOpacity 
          style={style.renderItem} 
          // onPress={()=>navigation.navigate('Project', {car, author, createdAt})}
        >
            <Image style={[style.imageIcon, {borderColor:theme.backgroundContent}]} source={{uri:car.imagesCar[0].url}}/>
            <View style={{marginHorizontal:10, flex:1}}>
                <Text style={{letterSpacing:1, color:theme.fontColor}}>{car.CarMake}</Text>
                <Text style={{fontSize:13, color:theme.fontColorContent}}>{car.model}</Text>    
            </View>
            <Text style={{fontSize:17, marginRight:5, color:theme.fontColor}}>{car.likes}</Text>
            <Icon                 
                name='heart'
                type='evilicon'
                size={28} 
                color={theme.fontColor}
            />
        </TouchableOpacity>}
/>
  )
}
