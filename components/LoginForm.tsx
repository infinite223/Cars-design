import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState} from 'react'
import useAuth from '../hooks/useAuth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { getAuth } from '@firebase/auth'
import { GradientButton } from './GradientButton'
import { Icon } from '@rneui/themed';
import { AlertProps } from '../utils/types'
import { useSelector } from 'react-redux'
import { selectLanguage } from '../slices/languageSlice'
import { translations } from '../utils/translations'

// connectAuthEmulator(getAuth(), "http://localhost:9099");

const widthScreen = Dimensions.get('window').width

export const LoginForm:React.FC<{setShowAlert:(value:AlertProps)=> void}>= ({setShowAlert}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { errorText, placeholder: { emailText, passText }} = translations.components.Form

    const language = useSelector(selectLanguage)
 
    const auth = getAuth()

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((s)=>console.log(s))
        .catch((e)=> {
            setShowAlert({message:errorText[language as keyof typeof errorText] + " " +e.code, show:true, type:"ERROR"})
            console.log(e.code)
        })
    }

  return (
    <View style={{alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
            <View style={style.inputConteiner}>
                <Icon type="materialcon" name='email' color={'#bbb'}/>
                <TextInput placeholder={emailText[language as keyof typeof emailText]} textContentType='emailAddress' style={style.input} onChangeText={setEmail}/>
            </View>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput placeholder={passText[language as keyof typeof passText]} secureTextEntry={true} textContentType='password' style={style.input} onChangeText={setPassword}/>
            </View>
        </View>

        <TouchableOpacity style={{marginVertical:35}} onPress={login}>
            <GradientButton text='Login'/>
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
        fontSize:16
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
        backgroundColor:'rgb(248, 248, 248)',
        borderColor: "rgba(100, 180, 100, .2)",
        borderWidth:1,
        borderRadius:15,
        marginVertical:2,
        paddingHorizontal:15,
        paddingVertical:8
    }
})