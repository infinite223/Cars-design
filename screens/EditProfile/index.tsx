import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/base'
import SelectPlaceOnMap from '../modals/SelectPlaceOnMap'
import { style } from './style'
import { chooseImg } from './../../utils/functions/chooseImg';
import { updateProfile } from '../../firebase/profile/updateProfile';
import CustomInput from './../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import AlertModal from '../modals/AlertModal'
import { translations } from './../../utils/translations';

const EditProfileScreen = () => {
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const { user, logout, setUser }:any = useAuth()
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState(user.image?user.image:user.imageUri)
    const [name, setName] = useState(user.name?user.name:'')
    const [description, setDescription] = useState(user.description?user.description:'')
    const { headerText, placeText, placeholders: {descriptionText, nameHelpText, nameText}, profileImage } = translations.screens.EditProfile

      const [place, setPlace] = useState<any>({
        city:user.place?.city,
        latitude: user?.place?.latitude,
        longitude: user?.place?.longitude,
      })

    const [image, setImage] = useState<any>([])
    const [showAlert, setShowAlert] = useState<{show:boolean, message:string, type?:string}>()

    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)

    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
            {headerText[language as keyof typeof headerText]}
          </Text>,
         headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
            <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
          </TouchableOpacity> 
      )})
    }, [theme, language])

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        {(showAlert && showAlert.type)&&<AlertModal resetError={setShowAlert} show={true} message={showAlert?.message} type={showAlert?.type}/>}
        <SelectPlaceOnMap details={{title:name, description:place.city}} origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
        <View style={[style.containerModal, {backgroundColor: theme.background}]}>
            <View style={{}}>
                  <CustomInput value={name} helpText={nameHelpText[language as keyof typeof nameHelpText]} placeholder={nameText[language as keyof typeof nameText]} setValue={setName} />
                  <TouchableOpacity style={[style.mainData, {alignItems:'center'}]} onPress={()=>chooseImg(
                    image, setImage, undefined, true
                  )}>
                      <Image resizeMode='contain' style={style.imageProfile} source={{uri: image[0]?.uri?image[0].uri:userImage?userImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}/>
                      <Text style={[style.imageProfileLabel, {color: theme.fontColorContent}]}>{profileImage[language as keyof typeof profileImage]}</Text>
                  </TouchableOpacity>
                  {userImage&&<TouchableOpacity onPress={()=>(setImage([]), setUserImage(null))} style={[style.resetPhoto, {backgroundColor: theme.backgroundContent}]}>
                    <Text style={[{color: theme.fontColorContent}]}>Set default photo</Text>
                  </TouchableOpacity>}
                <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={style.placeContainer}>
                    <Icon type='materialicon' name='add-location-alt' size={18} color={'white'}/>
                    <Text style={style.placeText}>{place.city?place.city:placeText[language as keyof typeof placeText]}</Text>
                </TouchableOpacity>
                <CustomInput value={description} max={100} placeholder={descriptionText[language as keyof typeof descriptionText]} setValue={setDescription} />
            </View>

            {(!showAlert?.show && user.name!=='Tester')&&
              <TouchableOpacity 
                disabled={name.length<3}
                onPress={() => updateProfile(user, name, image, place, description, setShowAlert, setUser)} 
                style={[style.updateButton, {opacity:name.length<3?.5:1}]}
              >
                <Icon type='entypo' name={'check'} size={26} color="white"/>
              </TouchableOpacity>
            }
        </View>
    </View>
  )
}

export default EditProfileScreen