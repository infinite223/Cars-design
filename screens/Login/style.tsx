import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    headerContainer: {
      flex:1,
      justifyContent:'space-evenly', 
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