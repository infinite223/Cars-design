import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export const CircleData:React.FC<{type:string, number:number, color:string}> = ({type, number, color}) => {
  return (
    <TouchableOpacity style={{width:105, height:105 , borderRadius:90, borderWidth:3, borderColor:'gray', alignItems:'center', justifyContent:'center'}}>
      <Text style={{textAlign:'center'}}>{type}</Text>
      <Text style={{color:color, fontWeight:'bold', fontSize:17}}>{number}</Text>
    </TouchableOpacity>
  )
}
