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

const EditProfileScreen = () => {
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const { user, logout }:any = useAuth()
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState(null)
    const [name, setName] = useState('')
    const [place, setPlace] = useState<{region:any, place:any}>({
        region: {},
        place: {} 
    })
    const [image, setImage] = useState<any>([])

    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)

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

    // useEffect(() => {
    //     const backAction = () => {
    //       Alert.alert("Poczekaj!", "musisz uzupełn", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "YES", onPress: () => BackHandler.exitApp() }
    //       ]);
    //       return true;
    //     };
    
    //     const backHandler = BackHandler.addEventListener(
    //       "hardwareBackPress",
    //       backAction
    //     );
    
    //     return () => backHandler.remove();
    //   }, []);

    const complate = (nickname && description)? true:false

  return (
    <View style={{flex:1}}>
        <SelectPlaceOnMap origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
        <View style={[style.containerModal, {backgroundColor: theme.background}]}>
            <View style={{}}>
              <CustomInput placeholder={user.displayName?user.displayName:'Type profile name'} setValue={setName} />
                <View style={[style.mainData]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>chooseImg(
                      image, setImage, undefined, true
                    )}>
                        <Image resizeMode='contain' style={style.imageProfile} source={{uri: userImage?userImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}/>
                        <Text style={[style.imageProfileLabel, {color: theme.fontColorContent}]}>Set profile image</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={style.placeContainer}>
                    <Text style={style.placeText}>{place.place.description?place.place.description:'Set place where people can find you'}</Text>
                    <Icon type='materialicon' name='add-location-alt' size={20} color={'white'}/>
                </TouchableOpacity>
                <CustomInput placeholder='Type profile description' setValue={setName} />
            </View>
            {/* <TouchableOpacity onPress={()=>deleteProfile()} style={style.deleteButton}>
                <Text style={[style.deleteText]}> DELATE PROFILE</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => updateProfile()} style={style.updateButton}>
              <Icon type='entypo' name={'check'} size={26} color="white"/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default EditProfileScreen