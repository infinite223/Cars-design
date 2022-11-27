import { View, Text, Modal, Alert, TouchableOpacity, TextInput, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { setDoc, collection, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import useAuth from '../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../../slices/themeSlice';
import { Icon } from '@rneui/base'
import SelectPlaceOnMap from '../SelectPlaceOnMap'


const EditProfileModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({modalVisible, setModalVisible}) => {
    
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [selectPlaceOnMapVisible, setSelectPlaceOnMapVisible] = useState(false)
    const { user, logout }:any = useAuth()
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState(null)
    const [place, setPlace] = useState<any>({
     
    })

    const theme = useSelector(selectTheme)

    // useEffect(() => {
    //     const backAction = () => {
    //       Alert.alert("Hold on!", "Are you sure you want to go back?", [
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

    return (
    <Modal
        animationType="slide"
        
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SelectPlaceOnMap origin={place} setOrigin={setPlace} modalVisible={selectPlaceOnMapVisible} setModalVisible={setSelectPlaceOnMapVisible}/>
        <View style={[style.containerModal, {backgroundColor: theme.background}]}>
            <View style={{}}>
                <Text style={[style.headerText, {color: theme.fontColor}]}>Update profile</Text>
                <TextInput style={[style.nameInput, {color: theme.fontColor, backgroundColor: theme.backgroundContent}]} placeholder='Type profile name' placeholderTextColor={theme.fontColorContent}/>
                <View style={[style.mainData]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{}}>
                        <Image resizeMode='contain' style={style.imageProfile} source={{uri: userImage?userImage:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}/>
                        <Text style={[style.imageProfileLabel, {color: theme.fontColorContent}]}>Set profile image</Text>
                    </TouchableOpacity>
                </View>

                <TextInput style={[style.descriptionInput, {color:theme.fontColor, backgroundColor: theme.backgroundContent}]} placeholder='Type profile description' placeholderTextColor={theme.fontColorContent}/>
                <TouchableOpacity onPress={()=>setSelectPlaceOnMapVisible(true)} style={style.placeContainer}>
                    <Text style={style.placeText}>{place?place:'Set place where people can find you'}</Text>
                    <Icon type='materialicon' name='add-location-alt' size={20} color={'white'}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.deleteButton}>
                <Text style={[style.deleteText]}> DELATE PROFILE</Text>
            </TouchableOpacity>
        </View>
      </Modal>
  )
}

export default EditProfileModal


const style = StyleSheet.create({
    containerModal: {
        width:"100%", 
        height:130,  
        flex: 1,
        paddingHorizontal:20,
        paddingVertical:15,
        justifyContent:'space-between'
    },
    headerText: {
        fontSize:20,
        letterSpacing:1,
        alignSelf:'center'
    },
    mainData: {
        marginVertical:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:1,
        borderColor:'rgba(50, 50, 50, 1)',
        borderRadius:15,
        paddingBottom:20,
        paddingTop:10
    },
    imageProfile: {
        width:100,
        height:100,      
    },
    imageProfileLabel: {
        fontSize:12,
        marginTop:5
    },
    nameInput: {
        fontSize:18,
        marginTop:10,
        borderRadius:10,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:'rgba(50, 50, 50, 1)',
        // height:100,
        paddingVertical:5
    },
    descriptionInput: {
        fontSize:16,
        borderRadius:10,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:'rgba(50, 50, 50, 1)',
        // height:100,
        paddingVertical:5
        // borderWidth:1,
    },
    placeContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:8,
        backgroundColor: '#273'
    },
    placeText: {
        fontSize:14,
        letterSpacing:1,
        color:'white'
    },
    deleteButton: {
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:8,
        backgroundColor: 'rgb(100, 20, 30)'
    //    justifyContent:'flex-end'
    },
    deleteText: {
        fontSize:13,
        letterSpacing:1,
        color:'#bbb'
    }
})