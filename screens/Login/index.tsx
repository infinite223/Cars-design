import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../components/LoginForm';
import { Icon } from '@rneui/base';
import { style } from './style';
import { RegisterForm } from '../../components/RegisterForm';

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { signInWithGoogle, signInAsTester }:any = useAuth()
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({headerShown:false})
  }, [])

  return (
      <View style={style.headerContainer}>
          <View style={{alignItems:'center'}}>

            <Image style={{width:150, height:150}} source={require("../../assets/cars_projects_IconV2.png")}/>
          
            <Text style={style.logoText}>Cars projects</Text>
            <Text style={style.aboutText}>
              Do you have your own car project? Share it with the rest of the world for others to see.
            </Text>
          </View>

          <View style={{marginBottom:0, alignItems:'center'}}>
              {!showRegisterForm?<LoginForm/>:<RegisterForm/>}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>setShowRegisterForm(!showRegisterForm)} style={{ alignItems:'center'}}>
                  <Text style={{fontSize:18, color:"#1b3", fontWeight:'bold'}}>{showRegisterForm?'login':'Create account'}</Text>
                </TouchableOpacity>
                <Text style={{marginHorizontal:10, color:'gray'}}>OR</Text>
                <TouchableOpacity onPress={()=>signInAsTester()} style={{alignItems:'center', flexDirection:'row'}}>
                  <Text style={{fontSize:18, color:"gray"}}>Demo</Text>
                  <Icon type='ionicon' name="ios-chevron-forward-outline" size={22} color="gray"/>
                </TouchableOpacity>
              </View>
          </View> 

        
        <TouchableOpacity 
          style={{elevation:5, flexDirection:'row', alignItems:'center', marginTop:10}}
          onPress={()=>signInWithGoogle()}
        >
          <Text style={{fontSize:13, color:"gray", letterSpacing:2}}>Sign up with google</Text>
          <Icon type='antdesign' name='google' size={19} style={{marginLeft:8}} color="gray"/>
        </TouchableOpacity> 
      </View>
  )
}

export default LoginScreen
