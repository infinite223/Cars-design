import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';

interface CustomInputProps {
    placeholder:string,
    setValue: (value:string) => void
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, setValue}) => {
    const theme = useSelector(selectTheme)
  return (
    <TextInput style={[style.input, 
        {borderColor: theme.backgroundContent, color: theme.fontColor}]} 
        placeholder={placeholder}
        placeholderTextColor={theme.fontColorContent}
    />
  )
}

export default CustomInput

const style = StyleSheet.create({
    input: {
        borderWidth:1,
        borderRadius: 15,
        fontSize:16,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical:5
    }
})