import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeSlice';
import { Icon } from '@rneui/base';
import { translations } from './../../utils/translations';
import { selectLanguage } from './../../slices/languageSlice';
import { style } from './style';
import { globalStyles } from '../../utils/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const ReviewsScreen = () => {
    const theme = useSelector(selectTheme)
    const navigation:any = useNavigation()
    const { headerTitle, contextText, labelText, placeholderText, buttonText } = translations.screens.Reviews
    const language = useSelector(selectLanguage)

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={[style.headerText, {color:theme.fontColor}]}>
            {headerTitle[language as keyof typeof headerTitle]}
           </Text>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          )
        })  
      }, [theme])
      
      const colorsGradient = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)','rgb(10, 12, 15)', 'rgb(10, 17, 31)']

  return (
    <View style={[style.container, {backgroundColor: theme.background}]}>
      <View style={{flex: 1}}>
        <View style={[style.context, { backgroundColor: theme.background}]}>
          <Text style={[style.contextText, {color: theme.fontColorContent}]}>
              {contextText[language as keyof typeof contextText]}
          </Text> 
        </View>

        <Text style={[style.labelText, {color: globalStyles.background_2}]}>{labelText[language as keyof typeof labelText]}</Text>

        <View style={[style.mainContent, {backgroundColor: theme.backgroundContent}]}>
          <TextInput 
              placeholder={placeholderText[language as keyof typeof placeholderText]}
              placeholderTextColor={theme.fontColorContent}
              multiline
              style={{color: theme.fontColor, textAlignVertical:'top'}}
              numberOfLines={10}
          />
        </View>
      </View>

      <TouchableOpacity>
        <LinearGradient
            colors={[colorsGradient[3], colorsGradient[1], colorsGradient[1], colorsGradient[0]]}
            locations={[0, 0.25, 0.45, 1]}
              start={[0, 0]}   
              end={[1, 0]}   
              style={style.sendButton}
            >
                <Text style={style.sendButtonText}>
              {buttonText[language as keyof typeof buttonText]}
          </Text>
          <Icon type='materialicon' name='arrow-forward-ios' size={20} style={{marginLeft:10}} color="white"/>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default ReviewsScreen