import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState} from 'react'
import useAuth from '../hooks/useAuth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { getAuth, connectAuthEmulator  } from '@firebase/auth'
import { GradientButton } from './GradientButton'
import { Icon } from '@rneui/base'

const widthScreen = Dimensions.get('window').width

// connectAuthEmulator(getAuth(), "http://localhost:9099");

export const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
 
    const auth = getAuth()

    const register = () => {
        if(repeatPassword===password){
            createUserWithEmailAndPassword(auth, email, password)
            .then((s)=>console.log(s))
            .catch((e)=>console.log(e))
        }
        else {
            setError('Passwords are not the same')
        }
    }

  return (
    <View style={{alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
            <Text style={style.labelText}>Your email</Text>
            <View style={style.inputConteiner}>
                <Icon type="fontisto" name='email' color={'#bbb'}/>
                <TextInput textContentType='emailAddress' style={style.input} onChangeText={setEmail}/>
            </View>        
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <Text style={style.labelText}>your password ...</Text>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput textContentType='password' style={style.input} onChangeText={setPassword}/>
            </View>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <Text style={style.labelText}>Repeat password ...</Text>
            <View style={style.inputConteiner}>
                <Icon type="ionicon" name='key' color={'#bbb'}/>
                <TextInput textContentType='password' style={style.input} onChangeText={setRepeatPassword}/>
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
        borderBottomWidth:1, 
        borderColor:'#ddd', 

        marginVertical:2,
        paddingVertical:3
    }
})