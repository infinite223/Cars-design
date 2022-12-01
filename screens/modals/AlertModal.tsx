import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'

interface AlertModalProps {
    show:boolean,
    message:string,
    type: string,
    resetError: (value:{show:boolean, message:string}) => void
}
const widthScreen = Dimensions.get('screen').width
const AlertModal:React.FC<AlertModalProps> = ({show, message, type, resetError}) => {
    useEffect(() => {
        setTimeout(() => {
            resetError({show: false, message: ''})
        }, 4000);
    }, [])
    
  return (
    <View style={style.modal}>
        <View style={[style.alertContainer, {backgroundColor: type==='ERROR'?'rgba(140, 40, 40, .9)':'rgba(40, 140, 40, .9)'}]}>
            <Text style={[style.message, {color: 'white'}]}>{message}</Text>
        </View>
    </View>
  )
}

export default AlertModal

const style = StyleSheet.create({
    modal: {
        zIndex:23,
        position:'absolute',
        bottom:70,
        width: widthScreen,
        alignItems:'center',
        justifyContent:'center',
    },
    alertContainer: {
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