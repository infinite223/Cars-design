import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { data } from '../../utils/data'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { NavigationHeaderTabs } from './NavigationHeaderTabs';
import { MaterialIcons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import ImagesModal from './../../screens/modals/ImagesModal';


const HistoryTab = () => {
  const navigationTab:any = useNavigation()
  const windowWidth = Dimensions.get('window').width;
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectStage, setSelectStage] = useState<{images?:string[], index:number}>({images: [], index:0})
  console.log(selectStage)
  const theme = useSelector(selectTheme)
  const selectedProject = 0

  const [opacity, setOpacity] = useState(.7)

  return (
    <View style={{ flex:1, backgroundColor:theme.background}}>
      {selectStage.images&&<ImagesModal modalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible} photos={selectStage.images} index={0}/>}
      <NavigationHeaderTabs navigationTab={navigationTab} tabName="History"/>
      <ScrollView>
        <FlatList
          scrollEnabled={true}        
          contentContainerStyle={{flex:1}}
          data={data[0].car.history}
          renderItem={({item, index})=>(
            <View style={style.renderItem}>
              {item.photosUrl&&
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={style.imagesContainer}
                  data={item.photosUrl}
                  renderItem={(photo)=> (
                      <Image style={{flex:1, width:windowWidth, height:240}} source={{uri: photo.item}}/>
                    //<FullWidthImage style={{width:200, height:140}} source={{uri: photo.item}}/>
                  )}
                />}
                  <TouchableOpacity onPress={()=>(setImagesModalVisible(true), setSelectStage({images:item.photosUrl, index}))} style={style.zoomIcon}>
                    <MaterialIcons name="zoom-out-map" size={22} color="white"/>
                  </TouchableOpacity>
                  <View style={[style.nameContainer, {backgroundColor: `rgba(1,1,1,${opacity})`}]}>
                    <Text style={style.name}>{item.name}</Text>
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
               <View style={style.footer}>
                  {item.company&&<Text  style={style.company}>{item.company}</Text>}
                  {item.date&&<Text style={style.date}>{item.date}</Text>}
                </View>
              </View>
            </View>
          )}  
        />
      </ScrollView>
    </View> 
  )
}

export default HistoryTab

const style = StyleSheet.create({
  renderItem: {
    position:'relative',
    marginBottom:5,
  //  borderBottomWidth:1,
    borderColor:'#eee'
  },
  zoomIcon: {
    position:'absolute', 
    top:10,
    right:10,
    zIndex:3
  },
  nameContainer: {  
   // marginLeft:10, 
    alignItems:'center',
    justifyContent:'center',

    position:'absolute',
    width:'100%',
    height:"100%",
    //marginTop:10,
    paddingHorizontal:15
  },
  name:{
    fontSize:18,
    letterSpacing:1,
    fontWeight:'600',

    color: 'white'
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
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  },
  performanceType: {
    fontSize:13,
    color:'#ddd',
    textTransform:'uppercase',
    fontStyle:'italic'
  },
  imagesContainer: {
    flex:1,
    flexDirection:'row',
    // marginHorizontal:15,
    marginTop:5,
  },
  footer: {
    flexDirection:'row',
    width:'100%',
    position:'absolute',
    bottom:10,
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:5
  },
  company: {
    fontWeight:'600',
    fontStyle:'italic',
    color:'white',
    fontSize:17
  },
  date: {
    color:'#ddd',
    fontSize:11
  }
})