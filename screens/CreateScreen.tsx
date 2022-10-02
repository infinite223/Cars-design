import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, Platform, Button  } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
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
import * as ImagePicker from 'expo-image-picker';

const CreateScreen = () => {
    const navigation:any = useNavigation()
    const [image, setImage] = useState<any>(null);
    const { user, logout }:any = useAuth()
    const [selectPlaceOnMapModalVisible, setSelectPlaceOnMapModalVisible] = useState(false)
    const [origin, setOrigin] = useState<any>({
        region:null,
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

      useEffect(() => {
		(async () => {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			alert('Sorry, Camera roll permissions are required to make this work!');
			}
		}
		})();
	}, []);
	
	const chooseImg = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,			
			allowsEditing: true,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		   setImage(result.uri);
		}
	};
    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <Text style={[style.text, {color: theme.fontColorContent, marginTop:0}]}>Car information</Text>
        <SelectPlaceOnMap origin={origin} setOrigin={setOrigin} modalVisible={selectPlaceOnMapModalVisible} setModalVisible={setSelectPlaceOnMapModalVisible}/>
        <CustomInput placeholder='Type car make' setValue={setMake}/>
        <CustomInput placeholder='Type car model' setValue={setModel}/>
        <CustomInput placeholder='Description...' setValue={setDescription}/>

        <Text style={[style.text, {color: theme.fontColorContent}]}>Perfonrmance car</Text>
        <ScrollView style={style.performanceContainer} horizontal>   
            <CustomInput placeholder='HP' setValue={setMake}/>
            <CustomInput placeholder='Nm' setValue={setMake}/>
            <CustomInput placeholder='0-100km/h (s)' setValue={setMake}/>
            <CustomInput placeholder='100-200km/h  (s)' setValue={setMake}/>
        </ScrollView>

        <Text style={[style.text, {color: theme.fontColorContent}]}>Location car</Text>
        <TouchableOpacity onPress={()=>setSelectPlaceOnMapModalVisible(true)} style={[style.setLocationButton, {borderColor: theme.backgroundContent}]}>
            <MaterialIcons name='place' color={theme.fontColorContent} size={20} style={{marginRight:0}}/>
            <Text style={[style.locationText, {color: theme.fontColorContent}]}>{origin.place?.description}</Text>
        </TouchableOpacity> 

        <Text style={[style.text, {color: theme.fontColorContent}]}>Photos car</Text>
        <ScrollView style={{ flex: 1, marginTop:5, flexDirection:'row' }} horizontal>		
			<TouchableOpacity onPress={chooseImg} style={[style.addImageButton, {borderColor: theme.backgroundContent}]}>
                <Text style={[style.chooseImageText, {color: theme.fontColor}]}>Choose image</Text>
                <Entypo name="plus" size={30} color={theme.fontColor}/>
            </TouchableOpacity>
			{image && <Image source={{ uri: image }} style={{ width: 120, height: 120, marginStart:10, borderRadius:15 }} />}
		</ScrollView>
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
        justifyContent:'center',

        borderRadius: 15,
        borderWidth: 1,
        
        paddingHorizontal:15,
        paddingVertical: 10,
        marginVertical: 5 
    },
    locationText: {
        fontSize:15,
        marginLeft: 10
    },
    input: {
        borderWidth:1,
        borderRadius: 15,
        fontSize:20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    text: {
        fontSize:14, 
        textAlign:'center',
        marginLeft:10, 
        marginTop:5,
        letterSpacing:1
    },
    performanceContainer: { 
        flexDirection: 'row',
        flexGrow:0,
        // paddingHorizontal: 15,
    },
    addImageButton: {
        borderWidth:1,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',

        width:120,
        height:120
    },
    chooseImageText: {
        maxWidth:"70%", 
        textAlign:'center', 
        marginBottom:10, 
        fontSize:12,
        letterSpacing:1
    }
})