import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    descriptopnText: {
      maxWidth:'80%',
      fontSize:12
    },
    locationContainer: {
      flexDirection:'row', 
      alignItems:'center',
      marginVertical:5
    },
    locationPlace: {
      fontSize:17, 
      fontWeight:'600', 
      letterSpacing:1,
    },
    bottomNav: {
      width:'100%', 
      position:'relative', 
      paddingHorizontal:10, 
      paddingVertical:8, 
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center'
    },
    iconsContainer: {
      flexDirection:'row', 
      alignItems:'center'
    }
  })