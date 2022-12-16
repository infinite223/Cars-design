import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { style } from './style';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

const ReportScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const [reportText, setReportText] = useState('')

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackVisible:false,
            headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
                 {/* {language==="en"?"Chats":"Czaty"} */}
                 Report project
             </Text>,
            headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
               <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
             </TouchableOpacity> 
         )})
    },[theme])


  return (
    <View style={[style.optionsContainer, {backgroundColor: theme.background}]}>
        <Text style={[style.headerText, {color: theme.fontColor}]}>
            Why you want to report this project?
        </Text>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
                The data provided to the car is incorrect
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
                The pictures do not show anything related to the automotive industry
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
                The project breaks the rules
            </Text>
        </TouchableOpacity>
        <View style={style.option}>
            <Text style={[style.optionText, {color: theme.fontColor, fontSize:17}]}>
                If it is something else, write
            </Text>
            <TextInput 
                placeholder='Type, why you reporting this project'
                placeholderTextColor={theme.fontColorContent}
                style={[style.reportInput, {color:theme.fontColor, borderBottomColor:theme.backgroundContent}]} 
                onChangeText={(text=> setReportText(text))}
                multiline={true}
            />
        </View>

        <TouchableOpacity style={style.reportButtonn}>
            <Text style={style.reportText}>Send report</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ReportScreen