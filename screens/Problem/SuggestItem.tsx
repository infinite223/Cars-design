import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { AlertProps, SuggestResolvedType } from '../../utils/types'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import _Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'
import useAuth, { db } from '../../hooks/useAuth'
import { Timestamp, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { globalStyles } from '../../utils/globalStyles'

export const SuggestItem:FC<{suggest: SuggestResolvedType,
   setShowSuggestInput: (value:boolean) => void,
   setAlertModal: (value: AlertProps) => void,
   problemId: string
  }> = ({suggest, setShowSuggestInput, setAlertModal, problemId}) => {
  const theme = useSelector(selectTheme)
  const { user }:any = useAuth()
  const isLikedByMe = suggest.likes.find((uid:string) => uid === user.uid)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // setShowSuggestInput(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowSuggestInput(true);
      }
    );
    }, [])

    const addComment = () => {
      if(user.uid === ''){
        setAlertModal({show:true, message: 'Jako tester nie możesz proponować rozwiązań', type:'ERROR'})
      }
      else if(user && commentText.length>1){
        updateDoc(doc(db, `problems/${problemId}/suggests`, suggest.id), 
          {
            'comments': arrayUnion({text: commentText, createdAt: Timestamp.now(), author: {uid:user.uid, name:user.name, imageUri: user.imageUri}}), 
          }
        )
        .then(() => setCommentText(''))
        .catch(() => setAlertModal({show:true, message: 'Coś poszło nie tak, spróbuj ponownie później', type:'ERROR'})) 
      }
      else {
        setAlertModal({show:true, message: 'Długość sugerowanego rozwiązania musi mieć minimum 2 znaki', type:'ERROR'})
      }
    } 
  
    const likeComment = () => {
      if(user){
        updateDoc(doc(db, `problems/${problemId}/suggests`, suggest.id), 
          {
            'likes': isLikedByMe?arrayRemove(user.uid):arrayUnion(user.uid), 
          }
        )
        .then(() => {})
        .catch(() => setAlertModal({show:true, message: 'Coś poszło nie tak, spróbuj ponownie później', type:'ERROR'})) 
      }
      else {
      }
    } 

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
            <TouchableOpacity 
              onPress={likeComment} 
              disabled={suggest.author.uid===user.uid} 
              style={{padding: 5}}
            >
                <_Icon_AntDesign 
                  name={'like2'} 
                  size={16} 
                  color={isLikedByMe?globalStyles.background_2:theme.fontColor} 
                  style={{ marginRight: 0 }}
                />
            </TouchableOpacity>
        </View>
        <TextInput 
            placeholder='Dodaj komentarz do rozwiązania'
            style={{flex: 1, color: theme.fontColor, marginHorizontal: 10, fontSize: 13}}
            placeholderTextColor={theme.fontColorContent}
            onFocus={() => setShowSuggestInput(false)}
            onEndEditing={() => setShowSuggestInput(true)}
            value={commentText}
            onChangeText={setCommentText}
        />
        <TouchableOpacity onPress={addComment} style={{padding: 5}}>
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
