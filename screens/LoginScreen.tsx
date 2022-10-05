import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from 'react-native-vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { signInWithGoogle, signInAsTester }:any = useAuth()

  useLayoutEffect(() => {
    navigation.setOptions({headerShown:false})
  }, [])

  return (
    // <ImageBackground style={{flex:1}} source={require('../assets/background.png')}>
      <View style={style.headerContainer}>
        <View style={{alignItems:'center'}}>

          <Image style={{width:150, height:150}} source={require("./../assets/cars_projects_Icon.png")}/>
        
          <Text style={style.logoText}>Cars projects</Text>
          <Text style={style.aboutText}>
            Do you have your own car project? Share it with the rest of the world for others to see.
          </Text>
          {/* <Image style={{width:50, height:50, borderRadius:10, marginTop:20}} source={require('../assets/icon.png')}/> */}
        </View>

        <View style={{marginTop:100, marginBottom:0, alignItems:'center'}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:12, color:'gray'}}>Your email</Text>
              <TextInput style={{borderBottomWidth:1, width:250, borderColor:'#ddd', textAlign:'center'}}/>
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
              <Text style={{fontSize:12, color:'gray'}}>your password</Text>
              <TextInput style={{borderBottomWidth:1, width:250, borderColor:'#ddd', textAlign:'center'}}/>
            </View>

            <TouchableOpacity style={{marginVertical:20, backgroundColor:'#1b3', width:250, alignItems:'center', paddingVertical:4, borderRadius:15}}>
              <Text style={{fontSize:20, color:"white", fontWeight:'bold'}}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TouchableOpacity style={{ alignItems:'center'}}>
                <Text style={{fontSize:15, color:"#1b3"}}>Create account</Text>
              </TouchableOpacity>
              <Text style={{marginHorizontal:10, color:'gray'}}>OR</Text>
              <TouchableOpacity onPress={()=>signInAsTester()} style={{alignItems:'center', flexDirection:'row'}}>
                <Text style={{fontSize:15, color:"gray"}}>Demo</Text>
                <Ionicons name="ios-chevron-forward-outline" size={22} color="gray"/>
              </TouchableOpacity>
            </View>
        </View> 
        
        <TouchableOpacity 
          style={{elevation:5, flexDirection:'row', alignItems:'center', position:'absolute', bottom:20}}
          onPress={()=>signInWithGoogle()}
        >
          {/* <LinearGradient
            colors={["#339", "#935"]}
            start={[0.7, 0.2]}
            style={{paddingHorizontal:25, paddingVertical:8, borderRadius:20}}
          >  */}
             <Text style={{fontSize:13, color:"gray", letterSpacing:2}}>Sign up with google</Text>
             <AntDesign name='google' size={19} style={{marginLeft:8}} color="gray"/>
          {/* </LinearGradient>    */}
        </TouchableOpacity> 
      </View>
    // </ImageBackground>
  )
}

export default LoginScreen

const style = StyleSheet.create({
  headerContainer: {
    flex:1,
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:'white'
  },
  logoText: {
    fontFamily:'monospace', 
    fontSize:35, 
    fontWeight:'bold'
  },
  aboutText: {
    fontSize:15, 
    color:'gray', 
    marginHorizontal:"17%", 
    textAlign:'center'
  }
})