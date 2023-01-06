import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    headerText: {
        marginLeft:0, 
        fontSize:20,
    },
    container: {
        paddingHorizontal:15,
        flex:1,
        position:'relative'
    },
    context: {
        paddingHorizontal:5,
        paddingVertical:10,
    },
    contextText: {
        fontSize:13
    },
    mainContent: {
        borderRadius:10,
        paddingHorizontal:15,
        marginVertical:10,
        paddingVertical:10,
    },
    labelText: {
        fontSize:18,
        marginHorizontal:5,
        letterSpacing:1
    },
    sendButton: {
        paddingHorizontal:15,
        paddingVertical:7,
        borderRadius:20,
        backgroundColor:'#273',
        position:'absolute',
        bottom:20,
        right:20,
        flexDirection:'row',
        alignItems:'center'
    },
    sendButtonText: {
        color:'white',
        fontSize:20,
        letterSpacing:2
    }
})