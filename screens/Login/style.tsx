import { Dimensions, StyleSheet } from "react-native"
const widthScreen = Dimensions.get('screen').width
export const style = StyleSheet.create({
    headerContainer: {
      flex:1,
      justifyContent:'space-around', 
      alignItems:'center',
      backgroundColor:'white'
    },
    logoText: {
      fontFamily:'monospace', 
      fontSize:30, 
      fontWeight:'bold',
      color:'white', 
    },
    aboutText: {
      fontSize:13, 
      color:'white', 
      marginHorizontal:"17%", 
      textAlign:'center',
      marginBottom:10,
    },
    description: {
      fontSize:13, 
      color:'white', 
      marginHorizontal:"17%", 
      textAlign:'center',
      marginVertical:20,
    },
    main: {
      flex:1,
      alignItems:'center', 
      justifyContent:'space-around',
      backgroundColor: 'white',
      width:widthScreen,
      paddingVertical:30,
      borderTopLeftRadius:40,
      borderTopRightRadius:40
    }
  })