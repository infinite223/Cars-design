import { TextInput, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { getColorsCircle } from './../utils/functions/colorsCircle';
import { selectLanguage } from './../slices/languageSlice';
import { validInpute } from './../utils/functions/validateInput';

interface CustomInputProps {
    placeholder:string,
    setValue: (value:string) => void,
    helpText?: string,
    performance?:string,
    max?:number,
    fontSize?:number,
    borderColor?:string,
    value?:string
}

const CustomInput:React.FC<CustomInputProps> = ({value, placeholder, setValue, helpText, borderColor, performance, max, fontSize}) => {
    const theme = useSelector(selectTheme)
    const [value1, setValue1] = useState('')
    const language = useSelector(selectLanguage)
    const [focus, setFocus] = useState(false)
    const [validate, setValidate] = useState(false)


    useEffect(() => {
        if(validInpute(value1, theme, performance, focus)==='rgba(200, 10, 10, .5)'){
            setValidate(false)
        }
        else{
            setValidate(true)
        }
    }, [value1])
    

  return (
    <View>
        <TextInput 
            style={[style.input, {
                fontSize:fontSize?fontSize:18, 
                borderColor: validInpute(value1, theme, performance, focus, borderColor),
                color: theme.fontColor
            }]} 
            value={value?value:value1}
            placeholder={placeholder}
            placeholderTextColor={theme.fontColorContent}
            onChangeText={(text)=>(setValue1(text), setValue(text))}
            onFocus={()=>setFocus(true)}
            onEndEditing={()=>setFocus(false)}
            keyboardType={performance?'numeric':'default'}
            maxLength={max}
            
        />
        <View style={style.footerContainer}>
            {helpText&&<Text style={[style.helperText, {color: focus?theme.fontColorContent:theme.backgroundContent}]}>
                {!validate?(language==='en'?"Incorrect value":"Nieprawidłowe dane"):helpText}
            </Text>}
            {performance&&<View style={[style.dotPerformance, {backgroundColor:getColorsCircle(parseInt(value1), performance)[0]}]}/>}
        </View>
      
    </View>
  )
}

export default CustomInput

const style = StyleSheet.create({
    input: {
        borderBottomWidth:1,
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
    },
    dotPerformance: {
        width:10, 
        height:10,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#223'
    }
})  