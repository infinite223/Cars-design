import { StyleSheet, ActivityIndicator } from 'react-native'
import * as Animatable from "react-native-animatable";
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';

export const LoadingView:React.FC<{headerText: string}> = ({headerText}) => {
    const theme = useSelector(selectTheme)
  return (
    <Animatable.View 
        animation='pulse'
        iterationCount={"infinite"}
        duration={2500}
        direction="normal" 
        style={[style.loadingContainer, {backgroundColor:"rgba(1, 1, 1, .9)"}]}
        
    >
        <ActivityIndicator size="large" />

        <Animatable.Text        
            style={[style.loadingText, {color: theme.fontColor}]}
        >
        {headerText}...
        </Animatable.Text>
    </Animatable.View>
  )
}

const style = StyleSheet.create({
    loadingContainer: {
        position:'absolute',
        zIndex:10,
        borderRadius:5,
        paddingHorizontal:20,
        paddingVertical:15,
        gap:10
    },
    loadingText: {
        fontSize:13,
        letterSpacing:1,
        fontWeight:'300'
    }
})