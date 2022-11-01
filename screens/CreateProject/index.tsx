import { View, Text, Image, StyleSheet, TouchableOpacity,  Dimensions, Platform  } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import SelectPlaceOnMap from './../modals/SelectPlaceOnMap';
import CustomInput from './../../components/CustomInput';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';
import { FlatList } from 'react-native-gesture-handler';
import { style } from './style'

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

    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)

    const [carData, setCarData] = useState({
        make: '',
        model: '',
        description: '',
        power: 0,
        torque: 0,   
        _0_100: 0,
        _100_200: 0
    })

    const widthScreen = Dimensions.get('window').width
    const flatListRef = useRef<any>(null)
    const [index, setIndex] = useState(0)

    const { inputPlaceholders: { description, make, model, power, torque }, cameraError, navTitleText, headerText } = translations.screens.CreateScreen

    let validateBasicInfo = carData.make && carData.model && carData.description?true:false;
    let validatePerformance = carData.power && carData.torque?true:false;

    const goToNextStep = () => {
        flatListRef?.current?.scrollToOffset({
            offset: index +1 * widthScreen,
            animated: true
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:5, fontSize:20, color:theme.fontColor}}>
                {language==="en"?navTitleText.en:navTitleText.pl}
            </Text>,
           headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:5}}>
                <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
            </TouchableOpacity> 
            ),
            headerRight: () => <Image style={style.logo} source={require('./../../assets/cars_projects_IconV2.png')}/>
            
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

    const steps = [
        <View style={{flex:1}}> 
            <Text style={[style.headerText]}>{language==='en'?headerText.en:headerText.pl}</Text>
            <View>
                <CustomInput placeholder={language==='en'?make.en:make.pl} setValue={(text)=>setCarData({...carData, make:text})} helpText="(BMW, Audi, Ford...)"/>
                <CustomInput placeholder={language==='en'?model.en:model.pl} setValue={(text)=>setCarData({...carData, model:text})} helpText="(Mustang, Scirocco, M4...)"/>
                <CustomInput placeholder={language==='en'?description.en:description.pl} setValue={(text)=>setCarData({...carData, description:text})} helpText="(np. Projekt został stowrzony...max 40 letters)"/>
            </View>
            <TouchableOpacity disabled={!validateBasicInfo} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?'#273':'#243'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={theme.fontColor} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <Text style={[style.headerText]}>Performance</Text>
            <View>
                <CustomInput placeholder={language==='en'?power.en:power.pl}  setValue={(text)=>setCarData({...carData, power: parseInt(text)})} helpText="(np. 360)" performance="hp"/>
                <CustomInput placeholder={language==='en'?torque.en:torque.pl}  setValue={(text)=>setCarData({...carData, torque:parseInt(text)})} helpText="(np. 530)" performance="nm"/>
                <CustomInput placeholder='0-100km/h (s)'  setValue={(text)=>setCarData({...carData, _0_100: parseFloat(text)})} helpText="(np. 5)" performance="_0_100"/>
                <CustomInput placeholder='100-200km/h (s)'  setValue={(text)=>setCarData({...carData, _100_200: parseFloat(text)})} helpText="(np. 13)" performance="_100_200"/>
            </View>
            <TouchableOpacity disabled={!validatePerformance} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validatePerformance?'#273':'#243'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={theme.fontColor} size={23}/>
            </TouchableOpacity>
        </View>    
    ]

  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <FlatList
            ref={flatListRef}
            pagingEnabled
            style={{width:widthScreen}}
            data={steps}
            horizontal
            scrollEnabled={false}
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
