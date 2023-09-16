import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get('screen').width

export const style = StyleSheet.create({
    createContainer: {
        flex: 1
    },
    mainHeader: {
        // flex:1,
        width:500,
        marginLeft: -15,
        marginRight: 10,
        paddingHorizontal:15,
        paddingVertical:7,
        borderRadius:0
    },
})