import { View, Text, Image, StyleSheet, TouchableOpacity,  Dimensions, Platform, ScrollView  } from 'react-native'
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
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { Car } from '../../utils/types'
import { app } from '../../hooks/useAuth';
import ErrorModal from '../modals/ErrorModal';
import SelectList from 'react-native-dropdown-select-list'

const CreateScreen = () => {
    const navigation:any = useNavigation()
    const db = getFirestore()
    const [images, setImages] = useState<any[]>([]);
    const [makesCategory, setMakesCategory] = useState<{key:number, value:string}[]>([])
    const [selected, setSelected] = useState("");
    const [showError, setShowError] = useState({show:false, message:''})
    const { user, logout }:any = useAuth()
    const storage = getStorage();
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
    console.log(carData)
    const widthScreen = Dimensions.get('window').width
    const heightScreen = Dimensions.get('window').height
    const flatListRef = useRef<any>(null)
    const [index, setIndex] = useState(0)

    const { inputPlaceholders: { description, make, model, power, torque }, cameraError, navTitleText, headerText } = translations.screens.CreateScreen

    let validateBasicInfo = carData.make && carData.model && carData.description?true:false;
    let validatePerformance = carData.power && carData.torque?true:false;

    const goToNextStep = () => {
        setIndex(index + 1)
        console.log(flatListRef)
        flatListRef?.current?.scrollToOffset({
            offset: (index+1) * widthScreen,
            animated: true
        })
    }

    const goToPrevStep = () => {
        if(index>=0) setIndex(index - 1)
        flatListRef?.current?.scrollToOffset({
            offset:(index-1) * widthScreen,
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

    useEffect(() => {
        const getMakes = async () => {
          await fetch('https://carapi.app/api/makes')
           .then((response) => response.json())
           .then((data:any) => 
               {
                let newArray = data.data.map((item:any) => {
                    return {key: item.id, value: item.name}
                })
                setMakesCategory(newArray)
               }
           );
           
        }
        getMakes()
    }, [])
	
	const chooseImg = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,			
			allowsEditing: true,
		});

        
	
		if (!result.cancelled) {
		   setImages([...images, result]);
		}
	};

    console.log(images)
    const uploadImages = async () => {
        const response = await fetch(images[0].uri)
        const blob = await response.blob()
        const immageFullName = images[0].uri.split('/')[images[0].uri.split('/').length-1]
        const storageRef = ref(storage, `${user.uid}/${carData.make}-${carData.model}/${immageFullName}`);


        try {
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log(snapshot)
                console.log('Uploaded a blob or file!');
            });
        } catch (error) {
            console.log(error)
        }
    }

    const addProject = async () => {
        if(user.uid){
            uploadImages()
        }
        else {
            const errorMessage = language==='pl'
                ?'Musisz być zalogowany aby dodać swój projekt'
                :'You must be login to add project' 
          
            setShowError({show:true, message: errorMessage})
            console.log(showError)
        }
        
       // console.log(immageFullName)
     
        // const finishCar:Car = {
        //     CarMake:carData.make,
        //     model:carData.model,
        //     likes:0,
        //     description:carData.description,
        //     performance: [
        //         {type:'hp', value:carData.power},
        //         {type:'nm', value: carData.torque},
        //         {type: '_0_100', value:carData._0_100},
        //         {type: '_100_200', value:carData._100_200}
        //     ],
        //     history:[],
        //     imagesCar: []
        // } 
        // await setDoc(doc(db, "Projects", user.uid), finishCar)
        //   .then(s=>console.log(s))
        //   .catch(e=>console.log(e))
    }

    const fincdMake = (number:number) => {
        let find = makesCategory.find((make)=>make.key===number)?.value
        if(typeof find === 'undefined'){
            find = ''
        }
        return find
    }
    
    const steps = [
        <View style={{flex:1}}> 
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                {index>1&&<Icon type="materialicon" name='arrow-back-ios' size={20} color='white' style={style.backIcon}/>}
                <Text style={[style.headerText]}>{language==='en'?headerText.en:headerText.pl}</Text>
            </View>
            <View>
                {makesCategory&&
                    <SelectList    
                        searchPlaceholder='Search car make'
                        searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
                        placeholder="Select car make"    
                        setSelected={(num:any)=>setCarData({...carData, make:fincdMake(num)})} 
                        boxStyles={{borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:-5, paddingBottom:10}}
                        inputStyles={{color: carData.make.length>1?theme.fontColor:theme.fontColorContent, fontSize:18, marginLeft:-9}}
                        dropdownTextStyles={{color: theme.fontColor}}
                        dropdownStyles={{borderWidth:1, borderColor: theme.backgroundContent}}
                        data={makesCategory} 
                        
                    />
                }
                <CustomInput placeholder={language==='en'?model.en:model.pl} setValue={(text)=>setCarData({...carData, model:text})} helpText="(Mustang, Scirocco, M4...)"/>
                <CustomInput placeholder={language==='en'?description.en:description.pl} setValue={(text)=>setCarData({...carData, description:text})} helpText="(np. Projekt został stowrzony...max 40 letters)"/>
            </View>
            <TouchableOpacity disabled={!validateBasicInfo} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color='gray' style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText, { marginLeft:-20}]}>Performance</Text>
            </View>
            <View>
                <CustomInput placeholder={language==='en'?power.en:power.pl}  setValue={(text)=>setCarData({...carData, power: parseInt(text)})} helpText="(np. 360)" performance="hp"/>
                <CustomInput placeholder={language==='en'?torque.en:torque.pl}  setValue={(text)=>setCarData({...carData, torque:parseInt(text)})} helpText="(np. 530)" performance="nm"/>
                <CustomInput placeholder='0-100km/h (s)'  setValue={(text)=>setCarData({...carData, _0_100: parseFloat(text)})} helpText="(np. 5)" performance="_0_100"/>
                <CustomInput placeholder='100-200km/h (s)'  setValue={(text)=>setCarData({...carData, _100_200: parseFloat(text)})} helpText="(np. 13)" performance="_100_200"/>
            </View>
            <TouchableOpacity disabled={!validatePerformance} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validatePerformance?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={theme.fontColor} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color='gray' style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText, { marginLeft:-20 }]}>
                    {language==="en"?'Images':'Zdjęcia'}
                </Text>
            </View>

            <View style={{ flexGrow:.0,  marginTop:20 }} >		
                <View style={style.headerImages}>
                    <TouchableOpacity onPress={chooseImg} style={[style.addImageButton, {borderColor: theme.backgroundContent}]}>            
                        <Icon type='entypo' name="plus" size={30} color={theme.fontColor}/>
                    </TouchableOpacity>
                    <View style={[style.helpTextConteiner]}>             
                        <Text style={[{color: theme.fontColor}]}>
                            Choose images to your gallery
                        </Text>
                        <Text style={[{color: theme.fontColorContent, maxWidth:200}]}>
                            On long press photo u can set place
                        </Text>
                    </View>
                </View>

                <FlatList 
                    style={{marginTop:20, maxHeight:heightScreen/1.6}}
                    data={images}
                    numColumns={2}
                    scrollEnabled
                    // contentContainerStyle={{maxHeight:500}}
                    ItemSeparatorComponent={()=><View style={{width:20}}/>}
                    renderItem={({item})=> (
                        <View style={{alignItems:'center', justifyContent:'center', height:120, marginVertical:10}}>
                            <Image source={{ uri: item.uri }} style={{ width: widthScreen / 2.5, height: 120, marginStart:15, borderRadius:15 }} />
                            <TouchableOpacity onPress={()=>setImages(images.filter((image)=>image.uri!==item.uri))} style={{position:'absolute', backgroundColor:'rgba(0,0,0, .6)', borderRadius:10}}>                         
                                <Icon type='entypo' name="minus" size={30} color={theme.fontColor}/>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={theme.fontColor} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color='gray' style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText, { marginLeft:-20 }]}>               
                    History
                </Text>
            </View>

            <View>
                {/* Add stages */}
            </View>
            {!showError.show&&<TouchableOpacity onPress={addProject} style={[style.nextStepButton, {flexDirection:'row', backgroundColor: validateBasicInfo?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Text style={[style.finishButton, { color: theme.fontColor}]}>Finish</Text>
                <Icon type='materialicon' name="arrow-forward-ios" color={theme.fontColor} size={23}/>
            </TouchableOpacity>}
        </View>            
    ]

  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        {showError.show&&<ErrorModal show={showError.show} message={showError.message} resetError={setShowError}/>}
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
