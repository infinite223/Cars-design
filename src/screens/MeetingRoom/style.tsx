import { StyleSheet, Dimensions } from "react-native"
import { globalStyles } from "../../utils/globalStyles"
const { height: SCREEN_HEIGHT }:any = Dimensions.get('window')

export const style = StyleSheet.create({
    mainContainer: {
      flex:1,
      position:'relative'
    },
    mainContent: {
      zIndex:10,
      height: SCREEN_HEIGHT+20,
      width: "100%",
      position: 'absolute',
      top: SCREEN_HEIGHT,
      borderRadius: 15,
    },
    textContainer: {
      paddingTop:30,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    date: {
      fontSize:12,
      color:'#1b3',
    },
    name:{ 
      fontWeight: 'bold',
       letterSpacing:2,
      fontFamily: 'notoserif',
      color: globalStyles.background_2,
    },
    place: {
      fontSize:13,
    }
  })