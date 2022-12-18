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
import { translations } from '../../utils/translations';

const ReportScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const [reportText, setReportText] = useState('')

    const {titleScreen, headerText, buttonText, option_1, option_2, option_3, option_4, placeholderOption } = translations.screens.ReportScreen

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackVisible:false,
            headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
                {titleScreen[language as keyof typeof titleScreen]}
             </Text>,
            headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
               <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
             </TouchableOpacity> 
         )})
    },[theme])

    const sendReport = () => {
        //
    }

  return (
    <View style={[style.optionsContainer, {backgroundColor: theme.background}]}>
        <Text style={[style.headerText, {color: theme.fontColor}]}>
            {headerText[language as keyof typeof headerText]}
        </Text>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
                {option_1[language as keyof typeof option_1]}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
            {option_2[language as keyof typeof option_2]}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.option, {backgroundColor: theme.backgroundContent}]}>
            <Text style={[style.optionText, {color: theme.fontColor}]}>
            {option_3[language as keyof typeof option_3]}
            </Text>
        </TouchableOpacity>
        <View style={style.option}>
            <Text style={[style.optionText, {color: theme.fontColor, fontSize:17}]}>
            {option_4[language as keyof typeof option_4]}
            </Text>
            <TextInput 
                placeholder={placeholderOption[language as keyof typeof placeholderOption]}
                placeholderTextColor={theme.fontColorContent}
                style={[style.reportInput, {color:theme.fontColor, borderBottomColor:theme.backgroundContent}]} 
                onChangeText={(text=> setReportText(text))}
                multiline={true}               
            />
        </View>

        <TouchableOpacity onPress={sendReport} style={style.reportButtonn}>
            <Text style={style.reportText}>
                {buttonText[language as keyof typeof buttonText]}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ReportScreen