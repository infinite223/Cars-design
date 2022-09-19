import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'

const HistoryTab = () => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <FlatList
        style={{marginTop:10, flex:1}}
        data={data[0].car.history}
        renderItem={({item})=>(
          <View style={style.renderItem}>
            <View style={style.nameContainer}><Text style={style.name}>{item.name}</Text></View>
            <Text style={style.description}>{item.description}</Text>
            <View style={style.performanceContainer}>
              <View style={style.performance}>
                <Text style={style.performanceValue}>{item.performance?.[0].value} </Text>
                <Text style={style.performanceType}>{item.performance?.[0].type}</Text>
              </View>
              <View style={style.performance}>
                <Text style={style.performanceValue}>{item.performance?.[1].value} </Text>
                <Text style={style.performanceType}>{item.performance?.[1].type}</Text>
              </View>
              {item.performance?.[3]?.type&&
              <View style={style.performance}>
                <Text style={style.performanceValue}>{item.performance?.[2]?.value} </Text>
                <Text style={style.performanceType}>{item.performance?.[2]?.type}</Text>
              </View>}
              {item.performance?.[3]?.type&&
              <View style={style.performance}>
                <Text style={style.performanceValue}>{item.performance?.[3]?.value} </Text>
                <Text style={style.performanceType}>{item.performance?.[3]?.type}</Text>
              </View>}
            </View>

            {item.photosUrl&&
              <FlatList
                horizontal
                style={style.imagesContainer}
                data={item.photosUrl}
                renderItem={(photo)=> (
                  <Image style={{width:180, height:130}} source={{uri: photo.item}}/>
                )}
              />}
              <View style={style.footer}>
                {item.company&&<Text  style={style.company}>{item.company}</Text>}
                {item.date&&<Text style={style.date}>{item.date}</Text>}
              </View>
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
    borderBottomWidth:1,
    borderColor:'#ccc'
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
  },
  performanceContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  performance: {
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:1,
    paddingVertical:5,
    marginHorizontal:5
  },
  performanceValue: {
    fontSize:18,
  },
  performanceType: {
    fontSize:13,
    color:'#333',
    textTransform:'uppercase',
    fontStyle:'italic'
  },
  imagesContainer: {
    flexDirection:'row',
    marginHorizontal:15,
    marginTop:5,
  },
  footer: {
    flex:1,
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    marginVertical:10
  },
  company: {
    fontWeight:'600',
    fontSize:17
  },
  date: {
    color:'#777',
    fontSize:11
  }
})