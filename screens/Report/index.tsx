import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { style } from './style';
import { TextInput } from 'react-native-gesture-handler';
import { translations } from '../../utils/translations';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import AlertModal from '../modals/AlertModal';
import { AlertProps } from '../../utils/types';
import { globalStyles } from '../../utils/globalStyles';

const ReportScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const [reportText, setReportText] = useState('')
    const route = useRoute<any>()
    const { id, type }:any = route.params;
    const [alertModal, setAlertModal] = useState<AlertProps>({message:'', show:false, type:''})
    const [selectedOption, setSelectedOption] = useState({1:false, 2:false, 3:false})
    const validOptions = selectedOption[1] || selectedOption[2] || selectedOption[3] || reportText.length > 0
    const { errorText, successText, buttonText, titleScreen, headerText, option_1, option_2, option_3, option_4, placeholderOption } = translations.screens.ReportScreen

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackVisible:false,
            headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
                {titleScreen[type as keyof typeof titleScreen][language as keyof typeof titleScreen.project]}
             </Text>,
            headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
               <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
             </TouchableOpacity> 
         )})
    },[theme])

    const sendReport = () => {
        const reportRef = doc(db, `Reports/${id}`)

        setDoc(reportRef, {
            type,
            id,
            selectedOption,
            reportText
        })
        .then(()=> setAlertModal({message: successText[language as keyof typeof successText], show:true, type:'SUCCESS'}))
        .catch(()=>setAlertModal({message: errorText[language as keyof typeof errorText], show:true, type:'ERROR'}))
    }

  return (
    <View style={[style.optionsContainer, {backgroundColor: theme.background}]}>
        {alertModal.show&&<AlertModal {...alertModal} resetError={setAlertModal}/>}
        <View style={style.optionsContainer_content}>
            <Text style={[style.headerText, {color: theme.fontColor}]}>
                {headerText[type as keyof typeof headerText][language as keyof typeof headerText.project]}
            </Text>
            <TouchableOpacity onPress={()=>setSelectedOption({...selectedOption, "1":!selectedOption[1]})} style={[style.option, {backgroundColor:selectedOption[1]?globalStyles.background_1:theme.backgroundContent}]}>
                <Text style={[style.optionText, {color: theme.fontColor}]}>
                    {option_1[language as keyof typeof option_1]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectedOption({...selectedOption, "2":!selectedOption[2]})} style={[style.option, {backgroundColor:selectedOption[2]?globalStyles.background_1:theme.backgroundContent}]}>
                <Text style={[style.optionText, {color: theme.fontColor}]}>
                {option_2[language as keyof typeof option_2]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectedOption({...selectedOption, "3":!selectedOption[3]})} style={[style.option, {backgroundColor: selectedOption[3]?globalStyles.background_1:theme.backgroundContent}]}>
                <Text style={[style.optionText, {color: theme.fontColor}]}>
                {option_3[type as keyof typeof option_3][language as keyof typeof option_3.project]}
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
        </View>

        <TouchableOpacity 
            disabled={!validOptions} 
            onPress={sendReport} 
            style={[style.reportButtonn, {opacity:validOptions?1:.4}]}>
            <Text style={style.reportText}>
                {buttonText[language as keyof typeof buttonText]}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ReportScreen