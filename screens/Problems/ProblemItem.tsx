import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import { useNavigation } from '@react-navigation/native'
import { ProblemsCategoryData, SpecyficProblemType } from '../../utils/types'
import { StatusProblem } from './StatusProblem'

interface ProblemItemProps {
    data: SpecyficProblemType
}

export const ProblemItem:FC<ProblemItemProps> = ({ data }) => {
    const theme = useSelector(selectTheme)
    const navigation:any = useNavigation()
    const [showStatus, setShowStatus] = useState(false)
  return (
    <TouchableOpacity 
        // onPressIn={() => setShowStatus(true)}
        onPressOut={() => setShowStatus(false)}
        onLongPress={() => setShowStatus(true)}
        activeOpacity={.5}
        onPress={() => navigation.navigate('/')} style={[localStyles.constainer, {backgroundColor: theme.backgroundContent}]}
    >
        <View style={localStyles.nav}>
            <Text style={[localStyles.headerText, { color: theme.fontColor }]}>
                {(data.title.length>25)?data.title.substring(0, 25)+ '...':data.title}
            </Text>
          <StatusProblem status={data.status} showStatus={showStatus}/>
        </View>

        <View>
            <Text style={[localStyles.description, { color: theme.fontColorContent }]}>
                {(data.description.length>100&&!showStatus)?data.description.substring(0, 100)+ '...':data.description}
            </Text>
        </View>
        {(data.category && data.type ==='Specyfic' && data.category !== 'other')&&
        <View style={{backgroundColor: 'rgb(59, 59, 59)', marginTop:'auto', alignSelf:'flex-end'}}>
                  {ProblemsCategoryData.find((_category) => _category.type === data.category)?.name}
                  {/* <BiCategory size={16}/> */}
        </View>}
    </TouchableOpacity>
  )
}

const localStyles = StyleSheet.create({ 
    constainer: {
        borderRadius: 0,
        padding: 10,
        marginVertical: 5
    },
    nav: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom:5
    },
    headerText: {
        fontSize: 15,
        fontWeight: '800'
    },
    description: {

    }
})

