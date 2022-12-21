import { StyleSheet, Dimensions } from "react-native"
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

export const style = StyleSheet.create({
    headerLeftContainer: {
        marginLeft:5,
        flexDirection:'row',
        alignItems:'center'
    },
    headerRightContainer: {
    flexDirection:'row',
     marginRight:10,
     marginTop:10
    },
    mainContainer: {
        flex:1, 
        paddingHorizontal:15, 
        position:'relative',
        // alignItems:'center',
        // justifyContent:'center'
    },
    headerText: {
        letterSpacing:1, 
        fontSize:17, 
        fontWeight:'600'
    },
    infoContainer: {
        flexDirection:'row', 
        justifyContent:'space-around', 
        marginVertical:5, 
        marginHorizontal: -15,
        borderTopWidth:1,
        borderBottomWidth:1,
        paddingHorizontal:15
    },
    itemInfo: {
        alignItems:'center', 
        paddingVertical:5
    },
    titleText: {
        letterSpacing:1, 
        fontSize:17, 
        fontWeight:'800', 
        marginVertical:10,
    },
    addProjectButton:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:8,
        marginRight:5
    },
    renderItem: {
        paddingVertical:5, 
        paddingHorizontal:5,
        position:'relative', 
        flex:.5, 
        flexDirection:'row', 
        alignItems:'center' 
    },
    imageIcon: {
        height:50, 
        width:50, 
        borderRadius:50, 
        borderWidth:1,
        resizeMode:'cover'
    },
    searchContainer: {
       flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:7,
        borderRadius:10,
        paddingVertical:7,
        marginBottom:15
    },
    searchInput: {
        fontSize:15,

    }
})