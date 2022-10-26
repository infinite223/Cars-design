import { TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { getColorsCircle } from './../utils/functions/colorsCircle';

interface CustomInputProps {
    placeholder:string,
    setValue: (value:string) => void,
    helpText?: string,
    performance?:string
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, setValue, helpText, performance}) => {
    const theme = useSelector(selectTheme)
    const [value1, setValue1] = useState('')
    const [focus, setFocus] = useState(false)
  return (
    <View>
        <TextInput 
            style={[style.input, {borderColor: focus?'#253':theme.backgroundContent, color: theme.fontColor}]} 
            placeholder={placeholder}
            placeholderTextColor={focus?theme.fontColorContent:theme.backgroundContent}
            onChangeText={(text)=>(setValue1(text), setValue(text))}
            onFocus={()=>setFocus(true)}
            onEndEditing={()=>setFocus(false)}
            keyboardType={performance?'numeric':'default'}
        />
        <View style={style.footerContainer}>
            {helpText&&<Text style={[style.helperText, {color: theme.fontColorContent}]}>{helpText}</Text>}
            {performance&&<View style={[style.dotPerformance, {backgroundColor:getColorsCircle(parseInt(value1), performance)[0]}]}/>}
        </View>
      
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
    footerContainer: {
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5,

    },
    helperText: {
        fontSize: 12,
        letterSpacing:1,
        // textAlign:'center'
    },
    dotPerformance: {
        width:7, 
        height:7,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#223'
    }
})  