import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { SpecyficProblemType, SuggestResolvedType } from '../../utils/types'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import _Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'

export const SuggestItem:FC<{suggest: SuggestResolvedType}> = ({suggest}) => {
    const theme = useSelector(selectTheme)

  return (
    <View style={[localStyles.container, {backgroundColor: theme.backgroundContent}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={localStyles.avatarImage} source={{ uri:suggest.author.imageUri }}/>
        <Text style={[localStyles.nameauthor, {color: theme.fontColor}]}>{suggest.author.name}</Text>
      </View>
      <Text style={[{color: theme.fontColor, marginTop: 5}]}>
        {suggest.text}
      </Text>
      <ScrollView style={{maxHeight: 100, marginVertical:5}}>
        {suggest.comments.map((comment) => 
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{alignItems: 'center', flexDirection:'row', gap: 5}}>
                    <Text style={[{color: theme.fontColorContent, fontSize: 10}]}>{comment.author.name}</Text>
                    <Text style={[{color: theme.fontColor, fontSize: 13}]}>{comment.text}</Text>
                </View>
                <Text style={[{color: theme.fontColorContent, fontSize: 10}]}>{comment.createdAt.toDate().toDateString()}</Text>
            </View>
        )}
      </ScrollView>

      <View style={localStyles.footer}>
        <View style={{flexDirection: 'row', alignItems:'center', gap: 5}}>
            <Text style={{color: theme.fontColor}}>{suggest.likes.length}</Text>
            <TouchableOpacity style={{padding: 5}}>
                <_Icon_AntDesign name={'like2'} size={16} color={theme.fontColor} style={{ marginRight: 0 }}/>
            </TouchableOpacity>
        </View>
        <TextInput 
            placeholder='Dodaj komentarz do rozwiązania'
            style={{flex: 1, color: theme.fontColor, marginHorizontal: 10, fontSize: 13}}
            placeholderTextColor={theme.fontColorContent}
        />
        <TouchableOpacity style={{padding: 5}}>
            <_Icon_Ionicons name={'send-outline'} size={16} color={theme.fontColor} style={{ marginRight: 0 }}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const localStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        marginVertical:5
    },
    avatarImage: {
        borderRadius: 50,
        width: 20,
        height: 20
    },
    nameauthor: {
        marginLeft: 7
    },
    footer: {
        flexDirection:'row',
        alignItems: 'center',
        marginTop:5
    }
})
