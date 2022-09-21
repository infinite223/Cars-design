import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';

export const NavigationHeaderTabs: React.FC<{navigationTab:any, tabName:string}> = ({navigationTab, tabName}) => {
  const theme = useSelector(selectTheme)
  return (
    <View style={[style.header, {backgroundColor:theme.background}]}> 
        <TouchableOpacity  onPress={() => navigationTab.navigate("Photos")} style={style.item}>
            <Text style={[style.text, {color:tabName==="Photos"?theme.fontColor:theme.fontColorContent}]}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationTab.navigate("History")} style={{paddingHorizontal:10, paddingVertical:5}}>
            <Text style={[style.text, {color:tabName==="Photos"?theme.fontColorContent:theme.fontColor}]}>History</Text>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-around', 
    paddingVertical:10
  },
  item : {
    paddingHorizontal:10, 
    paddingVertical:5
  },
  text: {
    letterSpacing:1,
    fontWeight:'800'
  }
})