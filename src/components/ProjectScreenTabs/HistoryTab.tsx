import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import ImagesModal from './../../screens/modals/ImagesModal';
import { Icon } from '@rneui/base';
import { getColorsCircle } from './../../utils/functions/colorsCircle';
import { selectProject } from '../../slices/selectedProject';

const HistoryTab = () => {
  const [imagesModalVisible, setImagesModalVisible] = useState(false)
  const [selectStage, setSelectStage] = useState<{images?:string[], index:number}>({images: [], index:0})
  const theme = useSelector(selectTheme)
  const selectedProject = useSelector(selectProject)

  return (
    <View style={{ flex:1, backgroundColor:theme.background}}>
      {selectStage.images&&<ImagesModal modalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible} photos={[{url:selectStage.images[0]}]} index={0}/>}
        <FlatList
          scrollEnabled={true}        
          contentContainerStyle={{flex:1}}
          style={{}}
          data={selectedProject.car.history}
          renderItem={({item, index})=>(
            <View style={[style.renderItem]}>          
                  {item.photosUrl.length>0&&<Image style={[style.image]} source={{uri:item.photosUrl}}/>}              
                  {item.photosUrl.length>0&&<TouchableOpacity onPress={()=>(setImagesModalVisible(true), setSelectStage({images:[item.photosUrl], index}))} style={style.zoomIcon}>                   
                    <Icon type='materialicons' name="zoom-out-map" size={22} color="white"/>
                  </TouchableOpacity>}
                  <View style={[style.nameContainer, {borderBottomWidth:1, borderColor: theme.backgroundContent}]}>
                    <Text style={style.name}>{item.name==='Stage 0'?'Stock':item.name}</Text>
                    <View style={style.performanceContainer}>
                      {item.performance?.[0].value&&<View style={style.performance}>
                        <Text style={[style.performanceValue, {color: getColorsCircle(item.performance[0].value, 'hp')[0]}]}>{item.performance[0].value} </Text>
                        <Text style={style.performanceType}>{item.performance?.[0].type}</Text>
                      </View>}
                      {item.performance?.[1].value&&<View style={style.performance}>
                        <Text style={[style.performanceValue, {color: getColorsCircle(item.performance[0].value, 'hp')[0]}]}>{item.performance?.[1].value} </Text>
                        <Text style={style.performanceType}>{item.performance?.[1].type}</Text>
                      </View>}
                    </View>
                    <View style={style.performanceContainer}>
                    {item.performance?.[2]?.type&&
                      <View style={style.performance}>
                        <Text style={style.performanceValue}>{item.performance?.[2]?.value} </Text>
                        <Text style={style.performanceType}>0-100Km/h</Text>
                      </View>}
                      {item.performance?.[3]?.type&&
                      <View style={style.performance}>
                        <Text style={style.performanceValue}>{item.performance?.[3]?.value} </Text>
                        <Text style={style.performanceType}>100-200Km/h</Text>
                      </View>}
                    </View>
                    {item.description.length>0&&<Text style={{color: theme.fontColorContent}}>{item.description}</Text>}

                  {(item.components && item.performance)&&
                      <FlatList
                        contentContainerStyle={[style.componentsContainer]}
                        ItemSeparatorComponent={()=><View style={{width:10}}/>}
                        horizontal
                        data={item.components}
                        renderItem={({item})=> (
                          <View style={[style.component, {backgroundColor: theme.backgroundContent}]}>
                            <Text style={[style.typeComponent]}>{item.type}</Text>
                            <Text style={[style.nameComponent, {color: theme.fontColor, fontWeight:'500'}]}>{item.name}</Text>
                            <Text style={[style.nameComponent, {color: theme.fontColor}]}>{item.description}</Text>
                          </View>
                        )}
                      />}
               <View style={style.footer}>
                  {item.company&&<Text  style={style.company}>{item.company}</Text>}
                </View>
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
    position:'relative',
    marginBottom:5,
  },
  zoomIcon: {
    position:'absolute', 
    top:10,
    right:10,
    zIndex:3
  },
  nameContainer: {  
    // position:'absolute',
    // width:'100%',
    // height:"100%",
    paddingVertical:15,
    paddingHorizontal:15
  },
  image: {
    position:'absolute',
    width:'100%',
    height:"100%",
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
  },
  performance: {
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:1,
    paddingVertical:5,
    marginRight:5
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
    height:300,
    // flex:1,
    flexDirection:'row',
    marginTop:5,
  },
  componentsContainer: {
   marginTop:10
  },
  component:{
    // alignItems:'center',
    justifyContent:'space-around',
    width:100,
    //backgroundColor: 'rgba(1,1,1,.2)',
    paddingHorizontal:10,
    paddingVertical:6,
    borderRadius:5
  },
  typeComponent: {
    textTransform:'uppercase',
    fontSize:12,
    color:'#bbb',
    letterSpacing:1,
    marginBottom:5
  },
  nameComponent: {
    fontWeight:'300',
    fontSize:11
  },
  imageComponent: {
    width:35, 
    height:35,
  },
  footer: {
    flexDirection:'row',
    width:'100%',
    position:'absolute',
    bottom:10,
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:5,
    paddingLeft:15
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