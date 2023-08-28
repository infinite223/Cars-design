import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get('screen').width

export const style = StyleSheet.create({
    createContainer: {
        flex: 1
    },
    createSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        borderColor: 'white',
        borderWidth: 0,
        width: SCREEN_WIDTH
    },
    textSection: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0,
        fontFamily: '',
        textTransform: 'uppercase'
    },
    description: {
        fontSize:13,
        textAlign: 'center',
        marginHorizontal: 20
    }
})