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
        justifyContent:'center',
    },
    renderItem: {
        paddingHorizontal:20
    },
    headerText: {
        color: 'white',
        fontSize:18,
        letterSpacing:1,
    },
    headerContainer: {
        position:'relative',
        // paddingHorizontal:15,
        width:'100%',
        backgroundColor: '#273',
        alignSelf:'center',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:4,
        marginBottom:10,
        marginHorizontal:0,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        opacity:1
    },
    backIcon: {
        // paddingLeft:15,
        paddingRight:5,
        paddingVertical:'10%'
    },
    logo: {
        width:40,
        height:40,
        borderRadius:10,
        marginRight:20,
        marginVertical:10
    },
    soundContainer: {
        flexDirection:'row', 
        alignItems:'center',
        marginTop:10,
        borderRadius:15,
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:5
    },
    soundText: {
        fontSize:15,
        marginLeft:10,
    },
    linksContainer: {
        marginVertical:20
    },
    linkInput: {
        borderWidth:1
    },
    linkText: {
        marginTop:5,
        letterSpacing:1
    },
    nextStepButton: {
        position: 'absolute', 
        bottom: 20, 
        right: 20,
        backgroundColor: '#273', 
        paddingHorizontal:22, 
        borderRadius:50, 
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'center',
        marginRight:-20
    },
    headerImages: {
        flexDirection:'row'
    },
    helpTextConteiner: {
        marginLeft:20
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
        borderRadius:25,  
        paddingVertical:12, 
        flexDirection:'row',
        borderWidth:1,

    },
    finishButtonText: {
        fontSize:18,
        letterSpacing:3,
        paddingHorizontal:7,
        fontWeight:'600'
    },
    stageComponent: {
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:0,
        borderRadius:5,
        paddingVertical:7 
    },
    removeStage: {
        borderRadius:15,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:0,  
        marginRight:10,
        marginLeft:10
    },
    stageContent:{
        borderRadius:15,
        paddingBottom:10,
        paddingHorizontal:10,
        paddingVertical:0,   
        marginVertical:5     
    },
    stageName: {
        paddingVertical:7, 
        paddingHorizontal:15,
        borderRadius:15,
        fontSize:16,
    },
    stageAddButton: {
        backgroundColor:'#273',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        marginVertical:12,
        borderRadius:15
    },
    addStageText: {
        // textTransform:'uppercase',
        letterSpacing:1,
        marginLeft:10
    },
    componentsContainer: {
   
    },
    addComponentButton: {
      paddingHorizontal:17,
      paddingVertical:0,
      marginVertical:20,
      alignItems:'center',
      justifyContent:'center',
      marginLeft:20,
      marginTop:20,
      borderRadius:15  
    },
    container: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-evenly',
        
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:10,
        marginVertical:10
    },
    component:{
      alignItems:'center',
      justifyContent:'space-around',
      width:100,
      height:110,
      //backgroundColor: 'rgba(1,1,1,.2)',
      paddingHorizontal:10,
      paddingVertical:6,
      borderRadius:15
    },
    typeComponent: {
      textTransform:'uppercase',
      textAlign:'center',
      fontSize:10,
      color:'#bbb',
      letterSpacing:1
    },
    nameComponent: {
      color:'white',
      fontWeight:'bold',
      letterSpacing:1,
      fontSize:12
    },
    imageComponent: {
      width:35, 
      height:35,
    },
})