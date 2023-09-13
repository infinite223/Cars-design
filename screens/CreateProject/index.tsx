import { View, Text, Image, TouchableOpacity,  Dimensions, Platform, ScrollView, TextInput  } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import useAuth, { db } from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import SelectPlaceOnMap from './../modals/SelectPlaceOnMap';
import CustomInput from './../../components/CustomInput';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';
import { FlatList } from 'react-native-gesture-handler';
import { style } from './style'
import AlertModal from '../modals/AlertModal';
import SelectList from 'react-native-dropdown-select-list'
import { chooseImg } from '../../utils/functions/chooseImg';
import { HistoryCar } from '../../utils/types'
import { findMakeInCategores } from '../../utils/functions/findMakeInCaategores';
import { addProject } from '../../firebase/project/addProject';
import { getMakes } from '../../utils/functions/getMakes';
import { AccordionView } from './stages';
import { validInpute } from '../../utils/functions/validateInput';
import * as DocumentPicker from 'expo-document-picker';
import { playSound } from '../../utils/functions/playSound';
import { collection, onSnapshot } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../../utils/globalStyles';

const CreateProject = () => {
    const { errorMessage, 
        historyHeadeText, imageHelpText_1, imageHelpText_2, imageHelpText_3, imageHelpText_4, 
        selectListPlaceholder, soundHeaderText, soundHelpText_1, soundHelpText_2, linksHeader,
        inputPlaceholders: { description, make, model, power, torque }, cameraError, navTitleText, baseHeaderText, historyHeaderText 
    } = translations.screens.CreateScreen

    const navigation:any = useNavigation()
    const [images, setImages] = useState<any[]>([]);
    const [makesCategory, setMakesCategory] = useState<{key:number, value:string}[]>([])
    const [showAddComponentModal, setShowAddComponentModal] = useState(false)
    const [activeSections, setActiveSections] = useState<number[]>([])
    const [showError, setShowError] = useState({type:'', show:false, message:''})
    const [imagesStages, setImagesStages] = useState<any[]>([]);
    const [soundCheck, setSoundCheck] = useState('')
    const [links, setLinks] = useState({yt:'', fb:'', ig:''})
    const [numberProjects, setNummberProjects] = useState(0)
    const dispatch = useDispatch()

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
           headerTitle: () => <Text style={{ fontSize:20, letterSpacing:1, fontWeight:'500', color:theme.fontColor}}>
                {navTitleText[language as keyof typeof navTitleText]}
            </Text>,
    })
      }, [theme, language])


    useEffect(()=> {
        const projectsRef = collection(db, `users/${user.uid}/projects/`)

        const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
          setNummberProjects(snapshot.docs.length)
        })

        return unsubscribe
      }, [])

    useEffect(() => {
	    (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(cameraError[language as keyof typeof cameraError]);
                }
            }
		})();
	}, []);

    useEffect(() => {
        getMakes(setMakesCategory)
    }, [])

    let validateBasicInfo = ( carData.make && carData.model )?true:false;
    let validatePerformance = (validInpute(carData.power.toString(), theme, 'hp', true)!=='rgba(200, 10, 10, .5)') && (validInpute(carData.torque.toString(), theme, 'nm', true)!=='rgba(200, 10, 10, .5)')

    useEffect(() => {
      if(stages.length>6){
        setStages(stages.slice(0, 6))
        setShowError({type:'ERROR', show:true, message:'Max count stages is 8'})
      }
    }, [stages])

    const pickMediaAsync = async () => {
        let result:any = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
            copyToCacheDirectory:true,
        });


        if(result.type === 'success'){
            if(result.size && result.size < 200000){
                setSoundCheck(result.uri) 
            }
            else {
                setShowError({message:errorMessage[language as keyof typeof errorMessage], show:true, type:'ERROR'})
            }
        }
        else {
            setShowError({message:'Error', show:true, type:'ERROR'})
        }
      };
    
    const colorsGradient = ['rgb(12,94,88)', 'rgb(1, 71, 67)','rgb(1, 131, 107)', 'rgb(12,57,48)']

    const steps = [
        <View style={{flex:1}}> 
            {showwSelectPlaceVisible&&<SelectPlaceOnMap origin={images[0].place} setOrigin={setOriginImage} modalVisible={showwSelectPlaceVisible} setModalVisible={setShowwSelectPlaceVisible}/>}
            <LinearGradient
                colors={colorsGradient}
                locations={[0, 0.25, 0.45, 1]}
                start={[0, 0]}   
                end={[1, 0]}   
                style={style.headerContainer}
            >
                {index>1&&<Icon type="materialicon" name='arrow-back-ios' size={17} color='white' style={style.backIcon}/>}
                <Text style={[style.headerText]}>{baseHeaderText[language as keyof typeof baseHeaderText]}</Text>
            </LinearGradient>
            <View>
                {makesCategory&&
                    <SelectList    
                        searchPlaceholder={selectListPlaceholder[language as keyof typeof selectListPlaceholder]}
                        searchicon={<Icon type='evilicon' name='search' color={theme.fontColor} style={{marginLeft:-4, marginRight:15}}/>}      
                        placeholder={selectListPlaceholder[language as keyof typeof selectListPlaceholder]} 
                        setSelected={(selectNumber:any)=>setCarData({...carData, make:findMakeInCategores(selectNumber, makesCategory)})} 
                        boxStyles={{borderWidth:0, borderBottomWidth:1, borderColor:theme.backgroundContent, marginHorizontal:-5, paddingBottom:10, marginBottom:5}}
                        inputStyles={{color: carData.make.length>1?theme.fontColor:theme.fontColorContent, fontSize:18, marginLeft:-9}}
                        dropdownTextStyles={{color: theme.fontColor, marginLeft:-10}}
                        dropdownStyles={{borderBottomWidth:1, borderWidth:0, borderColor: theme.backgroundContent, marginLeft:-5, marginBottom:5}}  
                        data={makesCategory} 
                    />
                }
                <CustomInput placeholder={model[language as keyof typeof model]} setValue={(text)=>setCarData({...carData, model:text})} helpText="(Mustang, Scirocco, M4...)"/>
                <CustomInput 
                 placeholder={description[language as keyof typeof description]} 
                 setValue={(text)=>setCarData({...carData, description:text})}
                 max={100}
                 helpText={language==='pl'?"(np. Projekt został stowrzony...max 100 letters)":"(np. Project was created...max 100 letters)"}
                />
            </View>
            <TouchableOpacity disabled={!validateBasicInfo} onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?globalStyles.background_1:'rgba(100, 120, 150, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>
        </View>,
        <View style={{flex:1}}>
            <LinearGradient
                colors={colorsGradient}
                locations={[0, 0.25, 0.45, 1]}
                start={[0, 0]}   
                end={[1, 0]}   
                style={style.headerContainer}
            >
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={17} color={'white'} style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText]}>
                    {language==="en"?'Images':'Zdjęcia'}
                </Text>
            </LinearGradient>

            <View style={{ flexGrow:.0,  marginTop:20 }} >		
                <View style={style.headerImages}>
                    <TouchableOpacity disabled={images.length>=6} onPress={()=>chooseImg(images, setImages)} style={[style.addImageButton, {backgroundColor: theme.backgroundContent, opacity:images.length>=6?.5:1}]}>            
                        <Icon type='entypo' name="plus" size={30} color={theme.fontColor}/>
                    </TouchableOpacity>
                    <View style={[style.helpTextConteiner]}>     
                        <Text style={[{color: theme.fontColor}]}>
                            {imageHelpText_1[language as keyof typeof imageHelpText_1]}
                        </Text>        
                        <Text style={[{color: '#f32', maxWidth:200, fontWeight: '600', fontSize: 16}]}>
                            -  {imageHelpText_2[language as keyof typeof imageHelpText_2]}
                        </Text>
                        <Text style={[{color: '#f32', maxWidth:200, fontWeight: '600', fontSize: 16}]}>
                           -  {imageHelpText_4[language as keyof typeof imageHelpText_4]}
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
                            <Image source={{ uri: item.uri }} style={{ width: widthScreen / 2.2, height: 120, marginStart:5, borderRadius:5 }} />
                            <TouchableOpacity onPress={()=>setImages(images.filter((image)=>image.uri!==item.uri))} style={{position:'absolute', top:10, right:10, padding:4, backgroundColor:'rgba(0,0,0, .6)', borderRadius:3}}>                         
                                <Icon type='entypo' name="minus" size={20} color={theme.fontColor}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {images.length>0&&<TouchableOpacity onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?globalStyles.background_1:'rgba(100, 120, 150, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>}
        </View>,
         <View style={{flex:1}}>
            <LinearGradient
                colors={colorsGradient}
                locations={[0, 0.25, 0.45, 1]}
                start={[0, 0]}   
                end={[1, 0]}   
                style={style.headerContainer}
            >
               <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={17} color={'white'} style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText]}>               
                    {soundHeaderText[language as keyof typeof soundHeaderText]}
                </Text>
            </LinearGradient>

            <View style={[style.headerImages, {marginTop:20}]}>
                    <TouchableOpacity onPress={()=>pickMediaAsync()} style={[style.addImageButton, {borderColor: theme.backgroundContent}]}>            
                        <Icon type='entypo' name="plus" size={30} color={theme.fontColor}/>
                    </TouchableOpacity>
                    <View style={[style.helpTextConteiner]}>             
                        <Text style={[{color: theme.fontColor}]}>
                            {soundHelpText_1[language as keyof typeof soundHelpText_1]}
                        </Text>
                        
                        <Text style={[{color: '#a32', maxWidth:200}]}>
                            {soundHelpText_2[language as keyof typeof soundHelpText_2]}
                        </Text>
                        {soundCheck.length>1&&<TouchableOpacity disabled={soundCheck.length<1} onPress={()=>playSound(soundCheck, true)} style={[style.soundContainer, {borderColor:theme.fontColorContent}]}>
                            <Icon type='feather' name='play' size={20} color={soundCheck.length>1?theme.fontColor:theme.fontColorContent}/>
                            <Text style={[style.soundText, {color:theme.fontColorContent}]}>Sound check</Text>
                        </TouchableOpacity>}
                    </View>
            </View>

            <View style={style.linksContainer}>
                <Text style={[{color:theme.fontColor, textAlign:'center', marginBottom:10}]}>{linksHeader[language as keyof typeof linksHeader]}</Text>
                <Text style={[style.linkText, {color: theme.fontColorContent}]}>Youtube</Text>
                <TextInput onChangeText={(text=> setLinks({...links, yt: text}))} style={[style.linkInput, {color:theme.fontColor, borderBottomColor: theme.backgroundContent}]}/>

                <Text style={[style.linkText, {color: theme.fontColorContent}]}>Instagram</Text>
                <TextInput onChangeText={(text=> setLinks({...links, ig: text}))} style={[style.linkInput, {color:theme.fontColor, borderBottomColor: theme.backgroundContent}]}/>

                <Text style={[style.linkText, {color: theme.fontColorContent}]}>Facebook</Text>
                <TextInput onChangeText={(text=> setLinks({...links, fb: text}))} style={[style.linkInput, {color:theme.fontColor, borderBottomColor: theme.backgroundContent}]}/>
            </View>

            <TouchableOpacity onPress={goToNextStep} style={[style.nextStepButton, {backgroundColor: validateBasicInfo?globalStyles.background_1:'rgba(100, 120, 150, .3)'}]}>
                <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={23}/>
            </TouchableOpacity>
         </View>,


        <View style={{flex:1}}>
            <LinearGradient
                colors={colorsGradient}
                locations={[0, 0.25, 0.45, 1]}
                start={[0, 0]}   
                end={[1, 0]}   
                style={style.headerContainer}
            >
                <TouchableOpacity onPress={goToPrevStep}>
                    <Icon type="materialicon" name='arrow-back-ios' size={20} color={'white'} style={style.backIcon}/>
                </TouchableOpacity>
                <Text style={[style.headerText]}>               
                    {historyHeadeText[language as keyof typeof historyHeadeText]}
                </Text>
            </LinearGradient>

            <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
               <Text style={[{color: theme.fontColorContent, marginVertical:10}]}>{historyHeaderText[language as keyof typeof historyHeaderText]}</Text>       
               <AccordionView 
                    setStages={setStages} 
                    stages={stages} 
                    showAddComponentModal={showAddComponentModal} 
                    setShowAddComponentModal={setShowAddComponentModal}
                    setActiveSections={setActiveSections}
                    activeSections={activeSections}
                    imagesStages={imagesStages}
                    setImagesStages={setImagesStages}
                />
               {(stages.length<6 && !showAddComponentModal)&&
               <TouchableOpacity 
                    onPress={()=>setStages([...stages, {name: `Stage ${stages.length+1}`, company:'', components: [], date:'', description:'', performance:[{type:'hp', value:0}, {type:'nm',value:0}, {type:'_0_100',value:0}, {type:'_100_200',value:0}]}])} 
                    style={[style.stageComponent, style.stageAddButton, {backgroundColor : theme.backgroundContent}]}
                >
                        <Icon type='octicon' name='plus' color={'white'} size={15}/>
                        <Text style={[style.addStageText, {color: 'white'}]}>Dodaj stage {stages.length+1}</Text>
                </TouchableOpacity>}    
            </ScrollView>
            {(!showError.show && !showAddComponentModal && activeSections.length<1)&&
            <TouchableOpacity 
                onPress={()=>addProject(images, soundCheck, imagesStages, links, carData, user, language, stages, setShowError, dispatch)} 
                style={[ style.finishButton, { borderColor: theme.backgroundContent, backgroundColor: validateBasicInfo?globalStyles.background_1:'rgba(100, 120, 150, .3)'}]}
            >
                <Text style={[style.finishButtonText, { color: 'white'}]}>Dodaj projekt</Text>
            </TouchableOpacity>}
        </View>            
    ]

  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        {showError.show&&<AlertModal type={showError.type} show={showError.show} message={showError.message} resetError={setShowError}/>}
        {numberProjects<4?<FlatList
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
        />:
            <Text style={[{color: theme.fontColorContent}]}> 
                {language === 'en'?'Basic account can only add 2 projects':'Podstawowe konto może dodać tylko dwa projekty'}
            </Text>
        }
    </View>
  )
}

export default CreateProject
