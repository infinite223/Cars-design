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
import { chooseImg } from '../../utils/functions/chooseImg';
import { HistoryCar } from '../../utils/types'
import { findMakeInCategores } from '../../utils/functions/findMakeInCaategores';
import { addProject } from '../../firebase/addProject';
import { getMakes } from '../../utils/functions/getMakes';
import Accordion from 'react-native-collapsible/Accordion';
import { AccordionView } from './stages';

const CreateScreen = () => {
    const { inputPlaceholders: { description, make, model, power, torque }, cameraError, navTitleText, headerText, historyHeaderText } = translations.screens.CreateScreen

    const navigation:any = useNavigation()
    const [images, setImages] = useState<any[]>([]);
    const [makesCategory, setMakesCategory] = useState<{key:number, value:string}[]>([])
    const [showAddComponentModal, setShowAddComponentModal] = useState(false)
    const [activeSections, setActiveSections] = useState<number[]>([])
    const [showError, setShowError] = useState({show:false, message:''})
    const { user, logout }:any = useAuth()
    const [originImage, setOriginImage] = useState<any>({})

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
    const [stages, setStages] = useState<HistoryCar[]>([])

    const [showwSelectPlaceVisible, setShowwSelectPlaceVisible] = useState(false)

    const widthScreen = Dimensions.get('window').width
    const heightScreen = Dimensions.get('window').height

    const flatListRef = useRef<FlatList>(null)
    const [index, setIndex] = useState(0)

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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
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
        getMakes(setMakesCategory)
    }, [])

    let validateBasicInfo = carData.make && carData.model && carData.description?true:false;
    let validatePerformance = carData.power && carData.torque?true:false;

    useEffect(() => {
      if(stages.length>6){
        setStages(stages.slice(0, 6))
        setShowError({show:true, message:'Max count stages is 8'})
      }
    }, [stages])
    


    const steps = [
        <View style={{flex:1}}> 
            {/* {showError&&<ErrorModal show={showError.show} message={showError.message} resetError={setShowError}/>} */}
            {showwSelectPlaceVisible&&<SelectPlaceOnMap origin={images[0].place} setOrigin={setOriginImage} modalVisible={showwSelectPlaceVisible} setModalVisible={setShowwSelectPlaceVisible}/>}
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
                        setSelected={(selectNumber:any)=>setCarData({...carData, make:findMakeInCategores(selectNumber, makesCategory)})} 
                        boxStyles={{borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:-5, paddingBottom:10, marginBottom:5}}
                        inputStyles={{color: carData.make.length>1?theme.fontColor:theme.fontColorContent, fontSize:18, marginLeft:-9}}
                        dropdownTextStyles={{color: theme.fontColor}}
                        dropdownStyles={{borderWidth:1, borderColor: theme.backgroundContent}}
                        data={makesCategory} 
                        
                    />
                }
                <CustomInput placeholder={language==='en'?model.en:model.pl} setValue={(text)=>setCarData({...carData, model:text})} helpText="(Mustang, Scirocco, M4...)"/>
                <CustomInput 
                 placeholder={language==='en'?description.en:description.pl} 
                 setValue={(text)=>setCarData({...carData, description:text})}
                 max={100}
                 helpText={language==='pl'?"(np. Projekt został stowrzony...max 100 letters)":"(np. Project was created...max 100 letters)"}
                />
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
                <Text style={[style.headerText, { marginLeft:-25}]}>Performance</Text>
            </View>
            <View>
                <CustomInput placeholder={language==='en'?power.en:power.pl}  setValue={(text)=>setCarData({...carData, power: parseInt(text)})} helpText="(np. 360)" performance="hp"/>
                <CustomInput placeholder={language==='en'?torque.en:torque.pl}  setValue={(text)=>setCarData({...carData, torque:parseInt(text)})} helpText="(np. 530)" performance="nm"/>
                <CustomInput placeholder='0-100km/h (s)'  setValue={(text)=>setCarData({...carData, _0_100: parseFloat(text.replace(',', '.'))})} helpText="(np. 5.3)" performance="_0_100"/>
                <CustomInput placeholder='100-200km/h (s)'  setValue={(text)=>setCarData({...carData, _100_200: parseFloat(text.replace(',', '.'))})} helpText="(np. 13.9)" performance="_100_200"/>
            </View>
            <TouchableOpacity disabled={!validatePerformance} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validatePerformance?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color='gray' style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText, { marginLeft:-25 }]}>
                    {language==="en"?'Images':'Zdjęcia'}
                </Text>
            </View>

            <View style={{ flexGrow:.0,  marginTop:20 }} >		
                <View style={style.headerImages}>
                    <TouchableOpacity onPress={()=>chooseImg(images, setImages)} style={[style.addImageButton, {borderColor: theme.backgroundContent}]}>            
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
                    ItemSeparatorComponent={()=><View style={{width:20}}/>}
                    renderItem={({item})=> (
                        <TouchableOpacity onLongPress={()=>setShowwSelectPlaceVisible(true)} style={{alignItems:'center', justifyContent:'center', height:120, marginVertical:10}}>
                            <Image source={{ uri: item.uri }} style={{ width: widthScreen / 2.5, height: 120, marginStart:15, borderRadius:15 }} />
                            <TouchableOpacity onPress={()=>setImages(images.filter((image)=>image.uri!==item.uri))} style={{position:'absolute', top:10, right:10, padding:4, backgroundColor:'rgba(0,0,0, .6)', borderRadius:10}}>                         
                                <Icon type='entypo' name="minus" size={20} color={theme.fontColor}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?'#273':'rgba(100, 160, 100, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <View style={[style.headerContainer, {backgroundColor:theme.backgroundContent}]}>
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color='gray' style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText, { marginLeft:-25 }]}>               
                    History
                </Text>
            </View>

            <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
               <Text style={[{color: theme.fontColorContent, marginVertical:10}]}>{language==='en'?historyHeaderText.en:historyHeaderText.pl}</Text>       
               <AccordionView 
                    setStages={setStages} 
                    stages={stages} 
                    showAddComponentModal={showAddComponentModal} 
                    setShowAddComponentModal={setShowAddComponentModal}
                    setActiveSections={setActiveSections}
                    activeSections={activeSections}
                />
               {(stages.length<6 && !showAddComponentModal)&&<TouchableOpacity onPress={()=>setStages([...stages, {name: `Stage ${stages.length+1}`}])} style={[style.stageComponent, style.stageAddButton]}>
                        <Icon type='octicon' name='plus' color={'white'} size={17}/>
                        <Text style={[style.addStageText, {color: 'white'}]}>dodaj stage {stages.length+1}</Text>
                </TouchableOpacity>}
            </ScrollView>
            {(!showError.show && !showAddComponentModal && activeSections.length<1)&&
            <TouchableOpacity 
                onPress={()=>addProject(images, carData.make, carData.model, user.uid, language, setShowError)} 
                style={[style.nextStepButton, style.finishButton, {borderColor: theme.backgroundContent, backgroundColor: validateBasicInfo?'#273':'rgba(100, 160, 100, .3)'}]}
            >
                <Text style={[style.finishButtonText, { color: 'white'}]}>Finish</Text>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
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
