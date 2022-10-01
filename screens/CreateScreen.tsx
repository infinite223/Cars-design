import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, AntDesignd, AntDesign, Ionicons, EvilIcons, Entypo, Octicons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';
import SelectPlaceOnMap from './modals/SelectPlaceOnMap';
import CustomInput from './../components/CustomInput';

const CreateScreen = () => {
    const navigation:any = useNavigation()
    const { user, logout }:any = useAuth()
    const [selectPlaceOnMapModalVisible, setSelectPlaceOnMapModalVisible] = useState(false)
    const [origin, setOrigin] = useState<any>({
        region:{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        place:{
            description: "Set place where people can find you"
        }
    })
    console.log(origin)
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')


    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>
                {/* {language==="en"?HeaderText.en:HeaderText.pl} */}
                Add project
            </Text>,
           headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
            </TouchableOpacity>
        )})
      }, [theme, language])
    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <SelectPlaceOnMap origin={origin} setOrigin={setOrigin} modalVisible={selectPlaceOnMapModalVisible} setModalVisible={setSelectPlaceOnMapModalVisible}/>
        <CustomInput placeholder='Type car make' setValue={setMake}/>
        <CustomInput placeholder='Type car model' setValue={setModel}/>
        <CustomInput placeholder='Description...' setValue={setDescription}/>
        <TouchableOpacity onPress={()=>setSelectPlaceOnMapModalVisible(true)} style={[style.setLocationButton, {borderColor: theme.backgroundContent}]}>
            <MaterialIcons name='place' color={theme.fontColor} size={20} style={{marginRight:5}}/>
            <Text style={[style.locationText, {color: theme.fontColor}]}>{origin.place?.description}</Text>
        </TouchableOpacity>
        <View style={style.performanceContainer}>
            <TextInput placeholder='Hp'/>
            <TextInput placeholder='Nm'/>
            <TextInput placeholder='0-100km/h'/>
            <TextInput placeholder='100-200km/h'/>
        </View>
    </View>
  )
}

export default CreateScreen

const style = StyleSheet.create({
    headerLeftContainer: {
        flexDirection:"row", 
        alignItems:'center', 
        width:65, 
        justifyContent:'space-around'
    },
    mainContainer: {
        flex:1, 
        paddingHorizontal:15, 
        position:'relative'
    },
    headerText: {
        letterSpacing:1, 
        fontSize:17, 
        fontWeight:'600'
    },
    setLocationButton: {
        alignItems:'center',
        flexDirection:'row',

        borderRadius: 15,
        borderWidth: 1,
        
        paddingHorizontal:20,
        paddingVertical: 10,
        marginVertical: 5 
    },
    locationText: {
        fontSize:17,
        marginLeft: 10
    },
    input: {
        borderWidth:1,
        borderRadius: 15,
        fontSize:20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    performanceContainer: {
        flexDirection: 'row',
    }
})