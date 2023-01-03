import { View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../components/LoginForm';
import { Icon } from '@rneui/base';
import { style } from './style';
import { RegisterForm } from '../../components/RegisterForm';
import AlertModal from '../modals/AlertModal';
import { AlertProps } from '../../utils/types';
import { useEffect } from 'react';

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { signInWithGoogle, signInAsTester }:any = useAuth()
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [keyboardShow, setKeyboardShow] = useState(false);

  const [showAlert, setShowAlert] = useState<AlertProps>({message:"", show:false, type:''})

  useLayoutEffect(() => {
    navigation.setOptions({headerShown:false})
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      }
    );
    }, [])

  return (
      <View style={style.headerContainer}>
        <ImageBackground style={style.headerContainer} resizeMode='cover' source={require("../../assets/background_login_2.png")}>
        {showAlert.show&&<AlertModal {...showAlert} resetError={setShowAlert}/>}
          <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>

            {/* <Image style={{width:100, height:100}} source={require("../../assets/cars_projects_IconV2.png")}/> */}
            <Text style={[style.aboutText, {fontSize:20, marginVertical:20, letterSpacing:2, fontWeight:'500'}]}>
              WELCOME TO
            </Text>
            <Text style={style.logoText}>Cars projects</Text>
            <Text style={style.aboutText}>
              Do you have your own car project? Share it with the rest of the world for others to see.
            </Text>
          </View>


          <View style={style.main}>
          <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
            <View style={{marginBottom:0, alignItems:'center'}}>
                {!showRegisterForm?<LoginForm setShowAlert={setShowAlert}/>:<RegisterForm setShowAlert={setShowAlert}/>}
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
            </KeyboardAvoidingView>
          
          {!keyboardShow&&<TouchableOpacity 
            style={{elevation:5, flexDirection:'row', alignItems:'center', marginTop:30}}
            onPress={()=>signInWithGoogle()}
          >
            <Text style={{fontSize:13, color:"gray", letterSpacing:2}}>Sign up with google</Text>
            <Icon type='antdesign' name='google' size={19} style={{marginLeft:8}} color="gray"/>
          </TouchableOpacity> }
        </View>
        </ImageBackground>
      </View>
  )
}

export default LoginScreen
