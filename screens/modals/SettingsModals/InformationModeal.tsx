import { View, Text, Modal, Alert, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { selectLanguage } from './../../../slices/languageSlice';
import { translations } from './../../../utils/translations';


const InformationModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    const { user, logout }:any = useAuth()
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { about, author, rules, support, title, version } = translations.screens.modals.settingsModals.informationModal

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={[style.mainContainer, {backgroundColor:theme.background}]}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>{language==="en"?title.en:title.pl}</Text>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?about.en:about.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eligendi id necessitatibus
                    quae assumenda possimus exercitationem provident nihil odit sapiente, vero, velit sunt
                    consequuntur consectetur recusandae non! Incidunt, consequatur optio!
                </Text>
            </View>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?version.en:version.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                   1.0.0
                </Text>
            </View>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?author.en:author.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                   Dawid Szmigiel
                </Text>
            </View>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?rules.en:rules.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem 
                   eos, soluta ipsam maxime cum reiciendis iure 
                   ullam nobis ad culpa itaque dolore fugiat minima dicta quos accusantium 
                   rerum recusandae expedita?
                </Text>
            </View>
            <View style={[style.itemContainer, {borderColor:theme.backgroundContent}]}>
                <Text style={[style.itemHeader, {color: theme.fontColor}]}>{language==="en"?support.en:support.pl}</Text>
                <Text style={[style.itemText, {color: theme.fontColorContent}]}>
                    dawidszmigiel9@gmail.com
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
        flex: 1,
        paddingHorizontal:15
    },
    headerText: {
        fontSize:20,
        letterSpacing:1
    },
    itemContainer: {
        borderWidth:1,
        marginVertical:5,
        padding:5
    },
    itemHeader: {
        fontSize:16
    },
    itemText: {

    }
})