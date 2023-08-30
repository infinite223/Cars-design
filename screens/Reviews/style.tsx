import { StyleSheet } from "react-native";
import { globalStyles } from "../../utils/globalStyles";

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
        paddingHorizontal:0,
        paddingVertical:10,
    },
    contextText: {
        fontSize:13
    },
    mainContent: {
        borderRadius:5,
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
        backgroundColor: globalStyles.background_1,
        // position:'absolute',
        // bottom:20,
        // right:20,
        paddingHorizontal:17,
        paddingVertical:10,
        borderRadius:5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    sendButtonText: {
        fontSize:16,
        letterSpacing:0,
        paddingHorizontal:7,
        marginRight:5,
        fontWeight:'700',
        textTransform: 'uppercase',
        color: 'white'
    }
})