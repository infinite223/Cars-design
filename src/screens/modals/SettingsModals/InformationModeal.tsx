import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { selectLanguage } from './../../../slices/languageSlice';
import { translations } from './../../../utils/translations';
import { globalStyles } from '../../../utils/globalStyles';

const InformationModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    const { user, logout }:any = useAuth()
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { headerText,  about, author, rules, support, title, version } = translations.screens.modals.settingsModals.informationModal

    return (
    <Modal
        style={{backgroundColor:'black'}}   
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={[style.mainContainer, {backgroundColor:theme.background}]}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>{language==="en"?title.en:title.pl}</Text>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent, borderWidth:1}]}>
                <Text style={[style.itemHeader, {color: globalStyles.background_2}]}>{headerText[language as keyof typeof headerText]}</Text>
                <Text style={[style.itemText, {color: theme.fontColor}]}>
                    {about[language as keyof typeof about]}
                </Text>
            </View>
            <View style={[style.itemContainer,  {borderColor:theme.backgroundContent, borderWidth:1}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?rules.en:rules.pl}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Terms")}>
                    <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                        Go to terms of use
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[style.itemContainer,  {borderColor:theme.backgroundContent, borderWidth:1}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?support.en:support.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                    carsprojectapp@gmail.com
                </Text>
            </View>
            <View style={[style.itemContainer,  {borderColor:theme.backgroundContent, borderWidth:1}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?version.en:version.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                   1.0.1
                </Text>
            </View>
            <View style={[style.itemContainer,  {borderColor:theme.backgroundContent, borderWidth:1}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?author.en:author.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                   Dawid Szmigiel
                </Text>
            </View>
        </ScrollView>
      </Modal>
  )
}

export default InformationModal

const style = StyleSheet.create({
    mainContainer: {
        width:"100%",  
        paddingHorizontal:5,
        paddingTop:10
    },
    headerText: {
        fontSize:20, 
        letterSpacing:1, 
        fontWeight:'500',
        marginHorizontal:10,
        marginBottom:10
    },
    itemContainer: {
        borderWidth:1,
        marginVertical:5,
        // paddingHorizontal:10,
        padding:10,
        borderRadius:0
    },
    itemHeader: {
        fontSize:15,
        letterSpacing:1,
        paddingHorizontal:5,
        fontWeight: '800',
        paddingVertical: 6
    },
    itemText: {
        marginHorizontal:5,
        marginVertical:5
    }
})