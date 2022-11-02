import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef, useState} from 'react'
import useAuth from '../hooks/useAuth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { getAuth, connectAuthEmulator  } from '@firebase/auth'

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
            <TextInput textContentType='emailAddress' style={style.input} onChangeText={setEmail}/>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <Text style={style.labelText}>your password ...</Text>
            <TextInput textContentType='password' style={style.input} onChangeText={setPassword}/>
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
            <Text style={style.labelText}>Repeat password ...</Text>
            <TextInput textContentType='password' style={style.input} onChangeText={setRepeatPassword}/>
        </View>

        <TouchableOpacity style={style.submitButton} onPress={register}>
            <Text style={style.buttonText}>Register</Text>
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
        borderBottomWidth:1, 
        width:250, 
        borderColor:'#ddd', 
        textAlign:'center'
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
    }
})