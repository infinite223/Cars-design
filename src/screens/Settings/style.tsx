import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    settingsContainer: {
        flex:1,
        paddingHorizontal:15,
    },
    option: {
        paddingVertical:5,
        marginVertical: 2,
        flexDirection:'row',
        alignItems:'center',
    },
    optionName: {   
        fontSize:18,
        marginLeft:15
    },
    logOutButton: {
        position:'absolute',
        bottom:15,
        width:'100%',
        alignSelf:'center',
        marginVertical:7,
        borderRadius: 15,
        paddingHorizontal:15,
        paddingVertical:8
    } 
})