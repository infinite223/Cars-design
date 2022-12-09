import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    mainContainer: {
      flex:1
    },
    renderItem: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:5,
      marginHorizontal:15,
      paddingVertical:8,
      flex:1,
      alignItems: 'center',    
      borderRadius:10,
     
    },
    textContainer: {
      marginLeft:15
    }
})