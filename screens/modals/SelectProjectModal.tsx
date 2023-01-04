import { Modal, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import MapView, { MapMarker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Place } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectProject } from './../../slices/selectedProject';
import { selectTheme } from './../../slices/themeSlice';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { arrayUnion, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import useAuth, { db } from './../../hooks/useAuth';
import { Icon } from '@rneui/base';

const SelectProjectModal:React.FC<{roomId:string, modalVisible:boolean, setModalVisible: (value:boolean) => void}> = ({roomId, modalVisible, setModalVisible}) => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)
    const [userProjects, setUserProjects] = useState<any>([])
    const { user }:any = useAuth()

    useEffect(()=> {
        const getProjects = () => {
            const projectsRef = collection(db, 'users', user.uid, 'projects')
        
             onSnapshot(projectsRef, (snapchot) => { 
                setUserProjects(snapchot.docs.map((doc, i)=> {
                    return doc.data()
                }))      
            })
        }
        getProjects()
    }, [])

    const joinMe = (carMake:string, model:string, imageUri:string) => {
        const meetingRef = doc(db, 'meetings', roomId)
    
        updateDoc(meetingRef, {
          'people':arrayUnion({name: user.name, imageUri: user.imageUri, uid:user.uid, carProject:{carMake, model, imageUri}})
        }).then(()=> setModalVisible(false))
      }

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >   
       <View style={style.modal}>
        <View style={[style.mainContainer, {backgroundColor: theme.background, borderColor: theme.backgroundContent}]}>
            <View>
                <Text style={[style.header, {color: theme.fontColor}]}>
                    Choose your car and join
                </Text>
                <FlatList
                    data={userProjects}
                    renderItem={({item: {car}})=> <TouchableOpacity onPress={()=>joinMe(car.CarMake, car.model, car.imagesCar[0].url)} style={[style.carItem, {backgroundColor: theme.backgroundContent}]}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={style.imageCar} source={{uri: car.imagesCar[0].url}}/>
                            <Text style={[style.nameCar,{color: theme.fontColor}]}>{car.CarMake+ " "}{car.model}</Text>
                        </View>
                       
                        <Icon style={{}} type="feather" name='chevron-right' color={theme.fontColor}/>
                    </TouchableOpacity>}
                />
            </View>

            {/* <TouchableOpacity onPress={()=>setModalVisible(false)} style={[style.joimButton, {}]}>
                <Text style={[{color: theme.fontColor}]}>
                    Join
                </Text>
            </TouchableOpacity> */}
        </View>
       </View>
       <StatusBar barStyle={"dark-content"}/>
      </Modal>
  )
}

export default SelectProjectModal


const style = StyleSheet.create({
    modal: {
        flex:1,
        backgroundColor: 'rgba(1,1,1,.6)',
        justifyContent:'center',
        alignItems:'center'
    },
    mainContainer: {
        width:'90%',
        // height:450,
        borderRadius:15,
        justifyContent:'space-between',
        paddingBottom:20,
        borderWidth:1
    },
    carItem: {
        paddingHorizontal:10,
        paddingVertical:7,
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        marginHorizontal:10
    },
    nameCar: {
        marginLeft:10
    },
    imageCar: {
        width:90,
        height:50,
    },
    joimButton: {
        paddingHorizontal:15,
        paddingVertical:6,
        borderRadius:10,
        backgroundColor: "#263",
        alignItems:'center',
        alignSelf:'flex-end',
        margin:20,
        zIndex:10
        // position:'absolute',
        // right:20,
        // bottom:20,
    },
    header: {
        alignSelf:'center',
        fontSize:16,
        marginVertical:20
    }
})
