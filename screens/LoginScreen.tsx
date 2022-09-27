import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const navigation = useNavigation()
  const { signInWithGoogle }:any = useAuth()

  useLayoutEffect(() => {
    navigation.setOptions({headerShown:false})
  }, [])

  return (
    <ImageBackground style={{flex:1}} source={require('../assets/background.png')}>
      <View style={style.headerContainer}>
        <View style={{alignItems:'center'}}>
        
          <Text style={style.logoText}>Cars projects</Text>
          <Text style={style.aboutText}>
            Do you have your own car project? Share it with the rest of the world for others to see.
          </Text>
          {/* <Image style={{width:50, height:50, borderRadius:10, marginTop:20}} source={require('../assets/icon.png')}/> */}
        </View>
        
        <TouchableOpacity 
          style={{elevation:5}}
          onPress={()=>signInWithGoogle()}
        >
          <LinearGradient
            colors={["#339", "#935"]}
            start={[0.7, 0.2]}
            style={{paddingHorizontal:25, paddingVertical:8, borderRadius:20}}
          > 
             <Text style={{fontSize:25, color:"white", fontWeight:'bold', letterSpacing:2}}>Sign In</Text>
          </LinearGradient>   
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const style = StyleSheet.create({
  headerContainer: {
    flex:1,
    justifyContent:'space-around', 
    alignItems:'center'
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