import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 17,
        maxWidth: '65%',
        fontWeight: '700'
    },
    descriptionText: {
        marginVertical: 10
    },
    footer: {
        borderRadius: 50,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 12,
        paddingVertical:7,
        marginBottom:10,
        borderWidth:1
    }
})