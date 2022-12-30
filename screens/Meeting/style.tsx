import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    roomsContainer: {
        alignSelf:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:3,
        // paddingHorizontal:5,
        width:'100%',
    },
    warningText: {
        marginLeft:12,
        maxWidth:250
    },
    meetingRoom: {
        marginHorizontal:15,
        flexDirection:'row',
        // backgroundColor:'#333',
        borderRadius:10,
        alignItems:'center',
        position:'relative',
        overflow: 'hidden',  
    },
    imageRoom: {
        width: 110,
        height: 60,
        borderBottomLeftRadius:5,
        borderTopLeftRadius:5,
        opacity: .9,
        backgroundColor: 'black',
    },
    dateContainer: {
        position:'relative',
        zIndex:10,
        backgroundColor:'#273',
        marginHorizontal:30,
        // borderTopRadius:20,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:5,
        maxWidth:120
    },
    textContainer: {
        paddingVertical:2,
        marginHorizontal:5,
        marginVertical:5
    },
    nameText: {
        fontSize:12
    },
    placeText: {
        fontSize:14,
        letterSpacing:1
    },
    countPeople: {
        // position: 'absolute',
        // bottom:2,
        // right:2,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:'gray',
        height:35,
        alignSelf:'center',
    },
    miniMap: {
        width: 110,
        height: 60,
        opacity:.7,
        borderRadius:0,
        position:'relative',
    }
})