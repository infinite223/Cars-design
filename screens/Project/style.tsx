import { StyleSheet, Dimensions } from "react-native"

export const style = StyleSheet.create({
    type: {

    },
    descriptopnText: {
      maxWidth:Dimensions.get('screen').width,
      fontSize:14,
      marginVertical:15,
      // textAlign:'center'
    },
    locationContainer: {
      flexDirection:'row', 
      alignItems:'center',
      marginVertical:5,
      alignSelf:'flex-start'
    },
    locationPlace: {
      fontSize:17, 
      fontWeight:'400'
    },
    bottomNav: {
      width:'100%', 
      position:'relative', 
      paddingHorizontal:15, 
      paddingVertical:8, 
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center'
    },
    iconPadding: {
      paddingHorizontal:5
    },
    iconsContainer: {
      flexDirection:'row', 
      alignItems:'center'
    }
  })