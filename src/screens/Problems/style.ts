import { StyleSheet, Dimensions } from "react-native"
import { globalStyles } from "../../utils/globalStyles"
const widthScreen = Dimensions.get('screen').width
export const style = StyleSheet.create({
    container: {
      flex:1
    },
    navigation: {
      alignItems: 'center',
      flexDirection:'row',
      height: 40,
      marginBottom: 10
  },
    typeProblem : {
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width: (widthScreen/2)-10
    },
    typeContainer: {
      height:40,
      flex:1,
      marginHorizontal: 5,
      borderRadius: 5,
      borderBottomWidth:1
  },
  errorCodeInput: {
    paddingHorizontal:10,
    paddingVertical:5,
    marginBottom: 10,
    borderBottomWidth:1,
    flex:1
  },
  searchButton: {
    marginHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 13,
    backgroundColor: globalStyles.background_1,
    borderRadius: 50,
    flexDirection:'row',
    alignItems: 'center',
    gap: 10
  },
  searchText: {
    fontSize: 13
  }
})