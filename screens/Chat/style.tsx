import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    mainContainer: {
      // width:"100%", 
      // height:130,  
      flex: 1,
      paddingHorizontal:15,
     // paddingTop:15
    },
    headerContainer: {
      flexDirection:'row', 
      alignItems:'center',
      marginHorizontal:5
    },
    bottomNav: {
      flexDirection:'row', 
      alignItems:'center',  
      marginVertical:15
    },
    cameraIcon: {
      borderColor:'gray', 
      borderRadius:20, 
      paddingVertical:7, 
      paddingHorizontal:10
    },
    inputMessage: {
      marginHorizontal:10,
      flex:1, 
      borderColor:'gray', 
      fontSize:18, 
      borderRadius:20, 
      paddingVertical:5, 
      paddingHorizontal:15
    },
    reciever: {
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:10,
      paddingVertical:6,
      alignSelf:'flex-end',
      borderRadius:15,
      marginBottom:20,
      maxWidth: '80%',
      position:'relative' 
    },
    sender: {
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:10,
      paddingVertical:6,
      alignSelf:'flex-start',
      borderRadius:15,
      marginBottom:20,
      maxWidth: '80%',
      position:'relative' 
    },
    recieverText: {
      // marginLeft:10
    },
    senderText:{
      marginLeft:10
    }
  })