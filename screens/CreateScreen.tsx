import { View, Text, Image, StyleSheet, TouchableOpacity,  ScrollView, Platform  } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';
import SelectPlaceOnMap from './modals/SelectPlaceOnMap';
import CustomInput from './../components/CustomInput';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';

const CreateScreen = () => {
    const navigation:any = useNavigation()
    const [images, setImages] = useState<string[]>([]);
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

    const {informationText, cameraError, locationText, navTitleText, perfonrmanceText, photoText} = translations.screens.CreateScreen


    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>
                {language==="en"?navTitleText.en:navTitleText.pl}
            </Text>,
           headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>            
                <Icon type='materialicon' name="arrow-back-ios"  size={22} color={theme.fontColor}/>
            </TouchableOpacity>
        )})
      }, [theme, language])

      useEffect(() => {
		(async () => {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			    alert(language==="en"?cameraError.en:cameraError.pl);
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
		   setImages([...images, result.uri]);
		}
	};

    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <Text style={[style.text, {color: theme.fontColorContent, marginTop:0}]}>
         {language==="en"?informationText.en:informationText.pl}
        </Text>
        <SelectPlaceOnMap origin={origin} setOrigin={setOrigin} modalVisible={selectPlaceOnMapModalVisible} setModalVisible={setSelectPlaceOnMapModalVisible}/>
        <CustomInput placeholder='Type car make' setValue={setMake} marginLeft={0}/>
        <CustomInput placeholder='Type car model' setValue={setModel} marginLeft={0}/>
        <CustomInput placeholder='Description...' setValue={setDescription} marginLeft={0}/>

        <Text style={[style.text, {color: theme.fontColorContent}]}>
            {language==="en"?perfonrmanceText.en:perfonrmanceText.pl}
        </Text>
        <ScrollView style={style.performanceContainer} horizontal>   
            <CustomInput placeholder='HP' setValue={setMake} marginLeft={0}/>
            <CustomInput placeholder='Nm' setValue={setMake} marginLeft={5}/>
            <CustomInput placeholder='0-100km/h (s)' setValue={setMake} marginLeft={5}/>
            <CustomInput placeholder='100-200km/h  (s)' setValue={setMake} marginLeft={5}/>
        </ScrollView>

        <Text style={[style.text, {color: theme.fontColorContent}]}>
            {language==="en"?locationText.en:locationText.pl}   
        </Text>
        <TouchableOpacity onPress={()=>setSelectPlaceOnMapModalVisible(true)} style={[style.setLocationButton, {borderColor: theme.backgroundContent}]}>         
            <Icon type='materialicon' name='place' color={'#bbb'} size={20} style={{marginRight:0}}/>
            <Text style={[style.locationText]}>{origin.place?.description}</Text>
        </TouchableOpacity> 

        <Text style={[style.text, {color: theme.fontColorContent}]}>               
          {language==="en"?photoText.en:photoText.pl}
        </Text>
        <ScrollView style={{ flex: 1, marginTop:5, flexDirection:'row' }} horizontal>		
			<TouchableOpacity onPress={chooseImg} style={[style.addImageButton, {borderColor: theme.backgroundContent}]}>            
                <Icon type='entypo' name="plus" size={30} color={theme.fontColor}/>
            </TouchableOpacity>
            {images.map((uri:string)=> {
                return  (
                    <View style={{alignItems:'center', justifyContent:'center', height:120}}>
                        <Image source={{ uri: uri }} style={{ width: 120, height: 120, marginStart:15, borderRadius:15 }} />
                        <TouchableOpacity onPress={()=>setImages(images.filter((item)=>item!==uri))} style={{position:'absolute', backgroundColor:'rgba(0,0,0, .6)', borderRadius:10}}>                         
                            <Icon type='entypo' name="minus" size={30} color={theme.fontColor}/>
                        </TouchableOpacity>
                    </View>
                )
            }
            )}
		
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
        borderWidth: 0,
        backgroundColor:'#272',
        
        paddingHorizontal:15,
        paddingVertical: 10,
        marginVertical: 4 
    },
    locationText: {
        fontSize:15,
        marginLeft: 10,
        color:'white'
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
        textAlign:'left',
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