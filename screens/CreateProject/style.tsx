import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    headerLeftContainer: {
        flexDirection:"row", 
        alignItems:'center', 
        width:65, 
        justifyContent:'space-around'
    },
    mainContainer: {
        flex:1, 
        paddingHorizontal:15, 
        position:'relative',
        alignItems:'center',
        justifyContent:'center'
    },
    renderItem: {
        paddingHorizontal:20
    },
    headerText: {
        color: '#293',
        fontSize:18,
        letterSpacing:3,
        fontWeight:'bold',
        textAlign:'center',
        flex:1,
    },
    headerContainer: {
        position:'relative',
        paddingHorizontal:15,
        paddingVertical:7,
        marginVertical:4,
        backgroundColor:'#111411',
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        opacity:.7
    },
    backIcon: {
        paddingLeft:3,
        paddingRight:8
    },
    logo: {
        width:40,
        height:40,
        borderRadius:10,
        marginRight:10,
        marginVertical:10
    },
    nextStepButton: {
        position: 'absolute', 
        bottom: 20, 
        right: 10,
        backgroundColor: '#273', 
        paddingHorizontal:18, 
        borderRadius:50, 
        paddingVertical:17,
        alignItems:'center',
        justifyContent:'center',
        marginRight:-10
    },
    addImageButton: {
        borderWidth:1,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',

        width:120,
        height:120
    },
    chooseImageText: {
        maxWidth:"70%", 
        textAlign:'center', 
        marginBottom:10, 
        fontSize:12,
        letterSpacing:1
    },
    finishButton: {
        fontSize:18,
        letterSpacing:3,
        paddingHorizontal:7,
        fontWeight:'600'
    }
})