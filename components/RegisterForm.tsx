import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState} from 'react'
import useAuth from '../hooks/useAuth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { getAuth, connectAuthEmulator  } from '@firebase/auth'
import { GradientButton } from './GradientButton'
import { Icon } from '@rneui/base'
import { AlertProps } from '../utils/types'


const widthScreen = Dimensions.get('window').width

// connectAuthEmulator(getAuth(), "http://localhost:9099");

export const RegisterForm:React.FC<{setShowAlert:(value:AlertProps)=> void}>= ({setShowAlert}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
 
    const auth = getAuth()

    const register = () => {
        if(repeatPassword===password){
            createUserWithEmailAndPassword(auth, email, password)
            .then((s)=> signInWithEmailAndPassword(auth, email, password))
            .catch((e)=> {
                setShowAlert({message:`Coś poszło nie tak ${e.code}`, show:true, type:"ERROR"})
                console.log(e.code)
            })
        }
        else {
            setShowAlert({message:`Hasła są różne`, show:true, type:"ERROR"})
        }
    }

  return (
    <View style={{alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
            <View style={style.inputConteiner}>
                <Icon type="materialcon" name='email' color={'#bbb'}/>
                <TextInput placeholder='Your email' textContentType='emailAddress' style={style.input} onChangeText={setEmail}/>
            </View>        
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput placeholder='Your password ...' textContentType='password' style={style.input} onChangeText={setPassword}/>
            </View>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput placeholder='Repeat password ...' textContentType='password' style={style.input} onChangeText={setRepeatPassword}/>
            </View>
        </View>

        <TouchableOpacity style={{marginVertical:35}} onPress={register}>
            <GradientButton text='Register'/>
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
        backgroundColor:'rgb(251, 251, 251)',
        borderWidth:1,
        borderColor: "rgba(100, 180, 100, .2)",
        borderRadius:15,
        paddingHorizontal:15,
        marginVertical:2,
        paddingVertical:8
    }
})