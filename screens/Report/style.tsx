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
        borderRadius:10
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
        paddingHorizontal:17,
        paddingVertical:7,
        borderRadius:20,
        alignItems:'center',
        flexDirection:'row'
    },
    reportText: {
        color:'white',
        fontSize:17,
        letterSpacing:1,
        marginRight:10
        // fontWeight:'bold',
        // textTransform:'uppercase'
    }
})