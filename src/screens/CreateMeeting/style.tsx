import { StyleSheet } from "react-native"
import { globalStyles } from "../../utils/globalStyles"

export const style = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'center'
    },
    createButton: {
        paddingHorizontal:15,
        paddingVertical:8,
        borderRadius:15,
        marginVertical:10,
        position:'absolute',
        bottom:20,
        right:10,
        backgroundColor: globalStyles.background_1,
        flexDirection:'row',
        alignItems:'center'
    },
    dateButton: {
        borderRadius:15,
        paddingHorizontal:15,
        paddingVertical:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10
    },
    locationButton: {
        position:'relative',
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        overflow: 'hidden',
    },
    dateText: {
        color: globalStyles.background_2,
        fontWeight:'bold',
        fontSize:18,
    },
    locationText: {
        marginVertical:2,
        fontSize:12,
        marginLeft:15
    },
    miniMap: {
        width: 310,
        height:87,
        opacity:.7,
        borderRadius:0,
        position:'relative',
    }
})