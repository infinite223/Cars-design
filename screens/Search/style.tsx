import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    searchContainer: {
        borderRadius:5,
        marginHorizontal:15,
        paddingLeft:10,
        paddingRight:5
    },
    searchButton:{
        borderRadius:10, 
        paddingHorizontal:10,
        paddingVertical:4
    },
    searchItem: {
        marginHorizontal:15,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:5,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1
    },
    imageCar: {
        width:90,
        height:50,
        borderRadius:5
    },
    carMake: {

    },
    model:{

    },
    performanceContainer: {
        alignItems:'center',
        marginLeft:15,
        justifyContent:'center',
        flexDirection:'row'
      },
      performanceValue: {
        fontSize:14,
      },
      performanceType: {
        fontSize:12,
      }, 
})