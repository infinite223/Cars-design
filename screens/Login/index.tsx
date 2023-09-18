import { StatusBar, View, Text, TouchableOpacity, Image,  ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
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
import { globalStyles } from '../../utils/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

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

    const colorsGradient_2 = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

  return (
      <View style={style.headerContainer}>
        {/* <StatusBar barStyle={'default'} backgroundColor={colorsGradient_2[1]}/> */}
        {/* <ImageBackground style={[style.headerContainer]} resizeMode='cover' source={require("../../assets/background_login_2.png")}> */}
        <LinearGradient
          colors={colorsGradient_2}
          locations={[0, 0.25, 0.45, 1]}
          start={[0, 0]}   
          end={[0, 1]}   
          style={style.headerContainer}
        >
        {showAlert.show&&<AlertModal {...showAlert} resetError={setShowAlert}/>}
          <View style={{ paddingBottom:20, alignItems:'center', flex:1, justifyContent:'center'}}>

            <Image style={{width:100, height:100, marginTop: 30}} source={require("../../assets/iconApp_1.png")}/>
            <Text style={[style.aboutText, {fontSize:20, marginVertical:20, letterSpacing:2, fontWeight:'500'}]}>
              WELCOME TO
            </Text>
            <Text style={style.logoText}>Cars Design</Text>
            <Text style={style.description}>
              Do you have your own car project? Share it with the rest of the world for others to see.
            </Text>
          </View>
          
          <View 
            style={[style.main, {backgroundColor: 'black'}]}
          >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
            <View style={{marginBottom:0, alignItems:'center'}}>
                <ScrollView>
                  {!showRegisterForm?<LoginForm setShowAlert={setShowAlert}/>:<RegisterForm setShowAlert={setShowAlert}/>}
                </ScrollView>
                {!keyboardShow&&<View style={{flexDirection:'row', alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>setShowRegisterForm(!showRegisterForm)} style={{ alignItems:'center'}}>
                    <Text style={{fontSize:18, color:globalStyles.background_2, fontWeight:'bold'}}>{showRegisterForm?'Zaloguj':'Utwórz konto'}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal:10, color:'lightgray'}}>OR</Text>
                  <TouchableOpacity onPress={()=>signInAsTester()} style={{alignItems:'center', flexDirection:'row'}}>
                    <Text style={{fontSize:18, color:"white"}}>Demo</Text>
                    <Icon type='ionicon' name="ios-chevron-forward-outline" size={22} color="gray"/>
                  </TouchableOpacity>
                </View>}
            </View> 
            </KeyboardAvoidingView>
          
          {!keyboardShow&&<TouchableOpacity 
            style={{elevation:5, flexDirection:'row', alignItems:'center', marginTop:30}}
            onPress={()=>signInWithGoogle()}
          >
            <Text style={{fontSize:13, color:"white", letterSpacing:2}}>Sign up with google</Text>
            <Icon type='antdesign' name='google' size={19} style={{marginLeft:8}} color="white"/>
          </TouchableOpacity> }
        </View>
        </LinearGradient>
        {/* </ImageBackground> */}
      </View>
  )
}

export default LoginScreen
