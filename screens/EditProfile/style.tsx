import { StyleSheet, Dimensions } from "react-native"
const heightScreen = Dimensions.get('window').height
export const style = StyleSheet.create({
    containerModal: {
        position:'relative',
        width:"100%", 
        flex:1,
        paddingHorizontal:20,
        paddingVertical:5,
        justifyContent:'space-between'
    },
    headerText: {
        fontSize:20,
        letterSpacing:1,
        alignSelf:'center'
    },
    mainData: {
        marginTop:15,
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'space-around',
        borderWidth:1,
        // borderColor:'rgba(50, 50, 50, 1)',
        borderRadius:15,
        paddingBottom:10,
        // paddingHorizontal:10,
        paddingTop:10
    },
    imageProfile: {
        width:100,
        height:100,    
        borderRadius:50  
    },
    resetPhoto: {
        paddingHorizontal:15, 
        paddingVertical:7,
        borderRadius:10,
    },
    imageProfileLabel: {
        fontSize:12,
        marginLeft:15
    },
    nameInput: {
        fontSize:18,
        borderRadius:50,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:'rgba(50, 50, 50, 1)',
        // height:100,
        paddingVertical:5
    },
    descriptionInput: {
        fontSize:16,
        borderRadius:10,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:'rgba(50, 50, 50, 1)',
        // height:100,
        paddingVertical:5
        // borderWidth:1,
    },
    placeContainer: {
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        marginTop:10,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:8,
        backgroundColor: '#273',
        marginBottom:5
    },
    placeText: {
        fontSize:14,
        letterSpacing:1,
        marginLeft:10,
        color:'white'
    },
    deleteButton: {
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:8,
        backgroundColor: 'rgb(100, 20, 30)'
    //    justifyContent:'flex-end'
    },
    deleteText: {
        fontSize:13,
        letterSpacing:1,
        color:'#bbb'
    },
    updateButton: {
        flexDirection:'row',
        position:'absolute',
        right:20,
        bottom:20,
        borderRadius:50,
        paddingHorizontal:20,
        paddingVertical:17,
        backgroundColor:'#273',
        borderWidth:1,
        borderColor:'#222'
    },
    updateText: {
        letterSpacing:3,
        // fontWeight:'bold',
        fontSize:17,
        marginRight:5
    }
})