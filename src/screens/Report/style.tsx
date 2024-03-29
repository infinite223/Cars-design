import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    headerText: {
        fontSize:17,
        marginVertical:5
    },
    optionsContainer: {
        paddingHorizontal:15,
        position:'relative',
        flex:1,
        justifyContent:'space-between'
    },
    optionsContainer_content: {
        position:'relative',
        flex:1
    },
    option: {
        paddingVertical:7,
        paddingHorizontal:10,
        marginTop:10,
        borderRadius:5
    },
    optionText: {
    },
    reportInput: {
        borderWidth:1,     
        fontSize:16,
    },
    reportButtonn: {
        backgroundColor:'#a11',
        paddingHorizontal:17,
        paddingVertical:10,
        borderRadius:50,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    reportText: {
        fontSize:15,
        letterSpacing:0,
        paddingHorizontal:7,
        marginRight:5,
        fontWeight:'700',
        textTransform: 'uppercase',
        color: 'white'
    }
})