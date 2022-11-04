import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

interface ErrorModalProps {
    show:boolean,
    message:string,
    resetError: (value:{show:boolean, message:string}) => void
}

const ErrorModal:React.FC<ErrorModalProps> = ({show, message, resetError}) => {
    useEffect(() => {
        setTimeout(() => {
            resetError({show: false, message: ''})
        }, 4000);
    }, [])
    
  return (
    <View style={style.errorContainer}>
      <Text style={[style.message, {color: 'white'}]}>{message}</Text>
    </View>
  )
}

export default ErrorModal

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