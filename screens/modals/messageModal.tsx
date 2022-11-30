import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

interface MessageModalProps {
    show:boolean,
    message:string,
    type: string,
    resetError: (value:{show:boolean, message:string}) => void
}

const MessageModal:React.FC<MessageModalProps> = ({show, message, type, resetError}) => {
    useEffect(() => {
        setTimeout(() => {
            resetError({show: false, message: ''})
        }, 4000);
    }, [])
    
  return (
    <View style={[style.errorContainer, {backgroundColor: type==='ERROR'?'rgba(140, 40, 40, .9)':'rgba(40, 140, 40, .9)'}]}>
      <Text style={[style.message, {color: 'white'}]}>{message}</Text>
    </View>
  )
}

export default MessageModal

const style = StyleSheet.create({
    errorContainer: {
        zIndex:23,
        position:'absolute',
        bottom:70,
        width:'90%',

        backgroundColor:'rgba(140, 40, 40, .9)',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:15,
        paddingHorizontal:20,
        paddingVertical:15
    },
    message: {
        fontSize: 16,

    }
})