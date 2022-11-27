import { View, Text, Modal, Alert, TouchableOpacity, TextInput, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
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

const EditProfileScreen = () => {
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const { user, logout }:any = useAuth()
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState(null)
    const [place, setPlace] = useState<{region:any, place:any}>({
        region: {},
        place: {} 
    })
    const [image, setImage] = useState<any>([])

    const theme = useSelector(selectTheme)

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    const complate = (nickname && description)? true:false

    const updateProfile = async () => {
        // await setDoc(doc(db, "users", user.uid), {
        //     user:user.uid,
        //     name:nickname,
        //     description:description,
        //     timestamp:serverTimestamp()
        //     // a:"b"
        // })
        // // const dbRef = collection(db, "users");
        // // // console.log(dbRef)
        // // await addDoc(dbRef, {xd:"s"})
        // .then((a)=> console.log(a))
        // .catch((e) => console.log(e))
     }

     const deleteProfile = () => {

     }

  return (
    <View style={{flex:1}}>
        <SelectPlaceOnMap origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
        <View style={[style.containerModal, {backgroundColor: theme.background}]}>
            <View style={{}}>
                <Text style={[style.headerText, {color: theme.fontColor}]}>Update profile</Text>
                <TextInput style={[style.nameInput, {color: theme.fontColor, backgroundColor: theme.backgroundContent}]} placeholder='Type profile name' placeholderTextColor={theme.fontColorContent}/>
                <View style={[style.mainData]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>chooseImg(
                      image, setImage, 
                    )}>
                        <Image resizeMode='contain' style={style.imageProfile} source={{uri: userImage?userImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}/>
                        <Text style={[style.imageProfileLabel, {color: theme.fontColorContent}]}>Set profile image</Text>
                    </TouchableOpacity>
                </View>

                <TextInput style={[style.descriptionInput, {color:theme.fontColor, backgroundColor: theme.backgroundContent}]} placeholder='Type profile description' placeholderTextColor={theme.fontColorContent}/>
                <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={style.placeContainer}>
                    <Text style={style.placeText}>{place.place.description?place.place.description:'Set place where people can find you'}</Text>
                    <Icon type='materialicon' name='add-location-alt' size={20} color={'white'}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>deleteProfile()} style={style.deleteButton}>
                <Text style={[style.deleteText]}> DELATE PROFILE</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default EditProfileScreen