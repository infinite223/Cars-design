import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { Ionicons } from 'react-native-vector-icons';

export const NavigationHeaderTabs: React.FC<{navigationTab:any, tabName:string}> = ({navigationTab, tabName}) => {
  const theme = useSelector(selectTheme)
  return (
    <View style={[style.header, {backgroundColor:theme.background}]}> 
        <TouchableOpacity  onPress={() => navigationTab.navigate("People")} style={style.item}>
            <Ionicons name="people-outline" size={18} color={theme.fontColorContent}/>
            <Text style={[style.text, {color:tabName==="People"?theme.fontColor:theme.fontColorContent}]}>People</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationTab.navigate("Chat")} style={style.item}>
            <Ionicons name="chatbubbles-outline" size={16} color={theme.fontColorContent}/>
            <Text style={[style.text, {color:tabName==="People"?theme.fontColorContent:theme.fontColor}]}>Chat</Text>
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
  item: {
    alignItems:'center',
    paddingHorizontal:10, 
    paddingVertical:5,
  },
  text: {
    letterSpacing:1,
    fontWeight:'800'
  }
})