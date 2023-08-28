import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import _Icon_Entypo from 'react-native-vector-icons/Entypo'
import { style } from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
export const ProblemsScreen = () => {
    const theme = useSelector(selectTheme)
    const navigation:any = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{ fontSize:20, letterSpacing:1, fontWeight:'500', color:theme.fontColor}}>
              Problemy 
           </Text>,
          headerRight: () => 
          <TouchableOpacity style={{paddingHorizontal:15, paddingVertical:5}} onPress={() => navigation.navigate('CreateProblem')}>
            <_Icon_Entypo name={'plus'} size={26} color={theme.fontColor} style={{ marginRight: 0 }}/>
          </TouchableOpacity>
        })  
      }, [theme])

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
        <Text>ssd</Text>
    </View>
  )
}
