import { TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';

interface CustomInputProps {
    placeholder:string,
    setValue: (value:string) => void,
    helpText?: string
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, setValue, helpText}) => {
    const theme = useSelector(selectTheme)
    const [value1, setValue1] = useState('')
    const [focus, setFocus] = useState(false)
  return (
    <View>
        <TextInput 
            style={[style.input, {borderColor: focus?'#253':theme.backgroundContent, color: theme.fontColor}]} 
            placeholder={placeholder}
            placeholderTextColor={theme.fontColorContent}
            onChangeText={(text)=>setValue1(text)}
            onFocus={()=>setFocus(true)}
            onEndEditing={()=>setFocus(false)}
        />
        {helpText&&<Text style={[style.helperText, {color: theme.fontColorContent}]}>{helpText}</Text>}
    </View>
  )
}

export default CustomInput

const style = StyleSheet.create({
    input: {
        borderBottomWidth:1,
        fontSize:18,
        paddingHorizontal: 5,
        paddingVertical: 9,
        marginVertical:3
    },
    helperText: {
        fontSize: 12,
        letterSpacing:1,
        marginLeft:10,
        // textAlign:'center'
    }
})