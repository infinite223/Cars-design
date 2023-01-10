import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectLoading } from './../slices/loadingSlice';
import { selectTheme } from './../slices/themeSlice';
import { LoadingView } from './LoadingView';

const UploadingStatus = () => {
    const loading = useSelector(selectLoading)
    // const loading = true
    const theme = useSelector(selectTheme)

  return (
    <View style={[style.modal, {zIndex:loading?10:-1}]}>
        <LoadingView headerText={'Loading...'}/>
    </View>
  )
}

export default UploadingStatus

const style = StyleSheet.create({
    modal: {
        flex:1,
        backgroundColor:'rgba(1, 1, 1, .4)',
        height: '100%',
        width:'100%',
        position:'absolute',
        alignItems:'center',
        justifyContent:'center'
    }
})