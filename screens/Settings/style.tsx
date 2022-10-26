import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    settingsContainer: {
        flex:1,
        paddingHorizontal:15,
    },
    option: {
        paddingVertical:5,
        flexDirection:'row',
        alignItems:'center',
    },
    optionName: {   
        fontSize:18,
        marginLeft:10
    },
    logOutButton: {
        marginVertical:5
    }
})