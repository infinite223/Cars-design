import { TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';

interface CustomInputProps {
    placeholder:string,
    setValue: (value:string) => void,
    marginLeft: number
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, setValue, marginLeft}) => {
    const theme = useSelector(selectTheme)
    const [value1, setValue1] = useState('')
  return (
    <TextInput style={[style.input, 
        {borderColor: theme.backgroundContent, color: theme.fontColor, marginLeft:marginLeft, textAlign:marginLeft>1?'center':'left'}
       ,(marginLeft>0&&value1.length>0)&&{width:20+20*value1.length}
        ]} 
        placeholder={placeholder}
        placeholderTextColor={theme.fontColorContent}
        onChangeText={(text)=>setValue1(text)}
    />
  )
}

export default CustomInput

const style = StyleSheet.create({
    input: {
        borderWidth:1,
        borderRadius: 10,
        fontSize:16,
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginVertical:7
    }
})