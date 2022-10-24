import { View, Text, Image, StyleSheet, TouchableOpacity,  Dimensions, Platform  } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
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
import { FlatList } from 'react-native-gesture-handler';

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
    const widthScreen = Dimensions.get('window').width
    const flatListRef = useRef<any>(null)

    console.log(flatListRef.current)

    const steps = [
        <View>
            <Text style={[style.headerText]}>Basic information</Text>
            <View>
                <CustomInput placeholder='Type car make' setValue={setMake} helpText="(BMW, Audi, Ford...)"/>
                <CustomInput placeholder='Type car model' setValue={setModel} helpText="(Mustang, Scirocco, M4...)"/>
                <CustomInput placeholder='Description...' setValue={setDescription} helpText="(np. Projekt został stowrzony...max 40 letters)"/>
            </View>
        </View>,
        <View>
            <Text style={[style.headerText]}>Performance</Text>
            <View>
                <CustomInput placeholder='Type car Hp' setValue={setMake} helpText="(np. 360)" performance="hp"/>
                <CustomInput placeholder='Type car Nm' setValue={setModel} helpText="(np. 530)" performance="nm"/>
                <CustomInput placeholder='0-100km/h (s)' setValue={setDescription} helpText="(np. 5)" performance="_0_100"/>
                <CustomInput placeholder='100-200km/h (s)' setValue={setDescription} helpText="(np. 13)" performance="_100_200"/>
            </View>
        </View>    
    ]

    const {informationText, cameraError, locationText, historyText, navTitleText, perfonrmanceText, photoText} = translations.screens.CreateScreen


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
            ),
            headerRight: () => <Image style={style.logo} source={require('./../assets/cars_projects_IconV2.png')}/>
            
    })
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
	
		if (!result.cancelled) {
		   setImages([...images, result.uri]);
		}
	};

    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <FlatList
            ref={flatListRef}
            pagingEnabled
            style={{width:widthScreen}}
            data={steps}
            horizontal
            // scrollEnabled={false}
            renderItem={({item})=> (
                <View style={[style.renderItem, {width: widthScreen}]}>
                    {item}
                </View>
            )}
        />
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
        position:'relative',
        alignItems:'center',
        justifyContent:'center'
    },
    renderItem: {
        paddingHorizontal:20
    },
    headerText: {
        color: '#293',
        fontSize:20,
        letterSpacing:2
    },
    logo: {
        width:40,
        height:40,
        borderRadius:10,
        marginRight:10
    }
})