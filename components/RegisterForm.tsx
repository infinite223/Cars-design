import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useState} from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { getAuth } from '@firebase/auth'
import { GradientButton } from './GradientButton'
import { Icon } from '@rneui/base'
import { AlertProps } from '../utils/types'
import { translations } from './../utils/translations';
import { useSelector } from 'react-redux';
import { selectLanguage } from './../slices/languageSlice';

const widthScreen = Dimensions.get('window').width

export const RegisterForm:React.FC<{setShowAlert:(value:AlertProps)=> void}>= ({setShowAlert}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const { errorText, errorPassText, placeholder: { emailText, passText, repeatPassText }} = translations.components.Form
 
    const auth = getAuth()
    const language = useSelector(selectLanguage)

    const register = () => {
        if(repeatPassword===password){
            createUserWithEmailAndPassword(auth, email, password)
            .then((s)=> signInWithEmailAndPassword(auth, email, password))
            .catch((e)=> {
                setShowAlert({message:errorText[language as keyof typeof errorText]+" "+ e.code, show:true, type:"ERROR"})
            })
        }
        else {
            setShowAlert({message:errorPassText[language as keyof typeof errorText], show:true, type:"ERROR"})
        }
    }

  return (
    <View style={{alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
            <View style={style.inputConteiner}>
                <Icon type="materialcon" name='email' color={'#bbb'}/>
                <TextInput 
                    placeholder={emailText[language as keyof typeof emailText]} 
                    textContentType='emailAddress' 
                    style={style.input} 
                    onChangeText={setEmail}
                    placeholderTextColor={'#999'}
                />
            </View>        
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput 
                    secureTextEntry 
                    placeholder={passText[language as keyof typeof passText]} 
                    textContentType='password' 
                    style={style.input} 
                    onChangeText={setPassword}                    
                    placeholderTextColor={'#999'}
                />
            </View>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput 
                    secureTextEntry 
                    placeholder={repeatPassText[language as keyof typeof repeatPassText]} 
                    textContentType='password' 
                    style={style.input} 
                    onChangeText={setRepeatPassword}
                    placeholderTextColor={'#999'}
                />
            </View>
        </View>

        <TouchableOpacity style={{marginVertical:35}} onPress={register}>
            <GradientButton text='Zarejestruj'/>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    labelText: {
        fontSize:12, 
        color:'gray'
    },
    input: {    
        marginLeft:10,
        borderBottomWidth:0, 
        width:widthScreen/1.5,
        borderColor:'#ddd', 
        fontSize:16,
        color:'white'
    },
    submitButton: {
        marginVertical:25, 
        backgroundColor:'#1b3',
        alignItems:'center', 
        paddingVertical:6, 
        paddingHorizontal:50,
        borderRadius:15
    },
    buttonText: {
        fontSize:17, 
        color:"white", 
        fontWeight:'bold'
    },
    inputConteiner:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(40, 40, 40)',
        borderWidth:1,
        borderColor: "rgba(10, 120, 160, .2)",
        borderRadius:15,
        paddingHorizontal:15,
        marginVertical:2,
        paddingVertical:8
    }
})