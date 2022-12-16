import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    headerText: {
        fontSize:17,
        marginVertical:5
    },
    optionsContainer: {
        paddingHorizontal:15,
        position:'relative',
        flex:1
    },
    option: {
        paddingVertical:7,
        paddingHorizontal:10,
        marginTop:10,
        borderRadius:15
    },
    optionText: {

    },
    reportInput: {
        borderWidth:1,     
        fontSize:16,
        
    },
    reportButtonn: {
        position:'absolute',
        bottom:20,
        right:20,
        backgroundColor:'#711',
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:20,
    },
    reportText: {
        color:'white',
        fontSize:20,
        letterSpacing:1,
    }
})