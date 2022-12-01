import { View, Text, Modal, Alert, TouchableOpacity, TextInput, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/base'
import SelectPlaceOnMap from '../modals/SelectPlaceOnMap'
import { style } from './style'
import { chooseImg } from './../../utils/functions/chooseImg';
import { deleteProfile, updateProfile } from '../../firebase/updateProfile';
import CustomInput from './../../components/CustomInput';
import { selectLanguage } from './../../slices/languageSlice';
import AlertModal from '../modals/AlertModal'

const EditProfileScreen = () => {
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const { user, logout, setUser }:any = useAuth()
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState(user.image?user.image:user.imageUri)
    const [name, setName] = useState(user.name?user.name:'')
    const [description, setDescription] = useState(user.description?user.description:'')
    
    const [place, setPlace] = useState<{region:any, place:any}>({
        region: user.place?{latitude: user.place.latitude, longitude:user.place.longitude}:{},
        place: user.place?.city?{ description: user.place.city }:{} 
    })
    const [image, setImage] = useState<any>([])
    const [showAlert, setShowAlert] = useState<{show:boolean, message:string, type?:string}>()

    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)

    console.log(place)

    useLayoutEffect(() => {
      navigation.setOptions({
         headerBackVisible:false,
         headerTitle: () => <Text style={{marginLeft:0, fontSize:20, color:theme.fontColor}}>
              Update profile
          </Text>,
         headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
            <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
          </TouchableOpacity> 
      )})
    }, [theme, language])

    // const complate = (nickname && description)? true:false

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        {(showAlert && showAlert.type)&&<AlertModal resetError={setShowAlert} show={true} message={showAlert?.message} type={showAlert?.type}/>}
        <SelectPlaceOnMap origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
        <View style={[style.containerModal, {backgroundColor: theme.background}]}>
            <View style={{}}>
              <CustomInput value={name} placeholder={'Type profile name'} setValue={setName} />
                  <TouchableOpacity style={[style.mainData, {alignItems:'center'}]} onPress={()=>chooseImg(
                    image, setImage, undefined, true
                  )}>
                      <Image resizeMode='contain' style={style.imageProfile} source={{uri: image[0]?.uri?image[0].uri:userImage?userImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}/>
                      <Text style={[style.imageProfileLabel, {color: theme.fontColorContent}]}>Set profile image</Text>
                  </TouchableOpacity>
                <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={style.placeContainer}>
                    <Icon type='materialicon' name='add-location-alt' size={18} color={'white'}/>
                    <Text style={style.placeText}>{place.place.description?place.place.description:'Set place where people can find you'}</Text>
                </TouchableOpacity>
                <CustomInput value={description} max={100} placeholder='Type profile description' setValue={setDescription} />
            </View>

            {(!showAlert?.show && user.name!=='Tester')&&<TouchableOpacity onPress={() => updateProfile(user, name, image, place, description, setShowAlert, setUser)} style={style.updateButton}>
              <Icon type='entypo' name={'check'} size={26} color="white"/>
            </TouchableOpacity>}
        </View>
    </View>
  )
}

export default EditProfileScreen