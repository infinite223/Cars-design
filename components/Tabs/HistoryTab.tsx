import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'

const HistoryTab = () => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <FlatList
        style={{marginTop:10}}
        data={data[0].car.history}
        renderItem={({item})=>(
          <View style={style.renderItem}>
            <View style={style.nameContainer}><Text style={style.name}>{item.name}</Text></View>
            <Text style={style.description}>{item.description}</Text>
            <Text>{item.performance?.[0].type}</Text>
          </View>
        )}  
      />
    </View>
  )
}

export default HistoryTab

const style = StyleSheet.create({
  renderItem: {
    marginVertical:5,
    alignItems:'center',
  },
  nameContainer: {  
    marginLeft:10, 
    paddingVertical:2,
    alignItems:'center',
    justifyContent:'center'
  },
  name:{
    fontSize:18,
    letterSpacing:1,
    fontWeight:'600'
  },
  description: {
    fontSize:14,
    color:"#666",
    textAlign:'center',
    maxWidth:300
  }
})