import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { data } from '../../utils/data'

const PhotosTab = () => {
  // wybrany projekt, mapowanie zdjęć  
  const selectedProject = 0
  return (
    <View style={{marginTop:5, flex:1, width:"100%"}}>
      <View style={{flexDirection:'row', flexWrap:'wrap', flex:1, justifyContent:'space-between'}}>
        {data[selectedProject].car.imagesCar.map((url) => 
          <TouchableOpacity style={{maxWidth:'50%'}}>
              {/* <Text>sdsa</Text> */}
              <Image style={{width:200, height:120}} source={{uri:url}}/>
          </TouchableOpacity>
        )}
      </View>
    </View> 
  )
}

export default PhotosTab