import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { MaterialIcons, Ionicons, EvilIcons } from 'react-native-vector-icons';
import { data } from '../utils/data';
import EditProfileScreen from './modals/SettingsModals/EditProfileModal';
import CreateProjectScreen from './modals/CreateProjectModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';
import { selectLanguage } from './../slices/languageSlice';
import { translations } from './../utils/translations';

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const { user, logout }:any = useAuth()
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false)
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText } = translations.screens.ProfileScreen

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:10, fontSize:20, color:theme.fontColor}}>{data[0].author.name}</Text>,
           headerLeft: () => (
            <View style={style.headerLeftContainer}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={22} color={theme.fontColor}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditProfileModalVisible(true)}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:data[0].author.imageUri}}    
                    />
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => <View style={style.headerRightContainer}> 
           <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{marginRight:13, borderWidth:1, borderRadius:8, borderColor:theme.fontColor}}>
                <Ionicons name="add-outline" size={20} color={theme.fontColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
                <Ionicons name="ios-settings-outline" size={24} color={theme.fontColor}/>
            </TouchableOpacity>
          </View>
        })  
      }, [theme])
    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
        <CreateProjectScreen modalVisible={createProjectModalVisible} setModalVisible={setCreateProjectModalVisible}/>
        <View style={{marginVertical:5}}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>
                {language==="en"?headerText.en:headerText.pl}
            </Text>
            <Text style={{color:theme.fontColorContent}}>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.a
                 Blanditiis, nostrum...
            </Text>
        </View>

        <View style={[style.infoContainer, {borderBottomColor: theme.backgroundContent, borderTopColor: theme.backgroundContent}]}>
            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followersText.en:followersText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>23</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?viewsText.en:viewsText.pl}</Text>
                <Text style={{fontSize:20,  color: theme.fontColor}}>50</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followingText.en:followingText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>65</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:5}}>
            <Text style={[style.titleText, {color:theme.fontColor}]}>{language==="en"?headerProjectsText.en:headerProjectsText.pl}</Text>
            <FlatList
                data={data}
                renderItem={({item: {car, author, createdAt}})=> 
                    <TouchableOpacity style={style.renderItem} onPress={()=>navigation.navigate('Project', {car, author, createdAt})}>
                        <Image style={[style.imageIcon, {borderColor:theme.backgroundContent}]} source={{uri:car.imagesCar[0]}}/>
                        <View style={{marginHorizontal:10, flex:1}}>
                            <Text style={{letterSpacing:1, color:theme.fontColor}}>{car.CarMake}</Text>
                            <Text style={{fontSize:13, color:theme.fontColorContent}}>{car.model}</Text>    
                        </View>
                        <Text style={{fontSize:17, marginRight:5, color:theme.fontColor}}>{car.likes}</Text>
                        <EvilIcons name='heart' size={30} color={theme.fontColor}/>
                    </TouchableOpacity>}
            />
        </View>
    </View>
  )
}

export default ProfileScreen

const style = StyleSheet.create({
    headerLeftContainer: {
        flexDirection:"row", 
        alignItems:'center', 
        width:65, 
        justifyContent:'space-around'
    },
    headerRightContainer: {
        flexDirection:'row', 
        alignItems:'center'
    },
    mainContainer: {
        flex:1, 
        paddingHorizontal:15, 
        position:'relative'
    },
    headerText: {
        letterSpacing:1, 
        fontSize:17, 
        fontWeight:'600'
    },
    infoContainer: {
        flexDirection:'row', 
        justifyContent:'space-around', 
        marginVertical:5, 
        marginHorizontal: -15,
        borderTopWidth:2,
        borderBottomWidth:2,
        paddingHorizontal:15
    },
    itemInfo: {
        alignItems:'center', 
        paddingVertical:5
    },
    titleText: {
        letterSpacing:1, 
        fontSize:17, 
        fontWeight:'800', 
        marginVertical:10,
    },
    renderItem: {
        paddingVertical:5, 
        position:'relative', 
        flex:.5, 
        flexDirection:'row', 
        alignItems:'center' 
    },
    imageIcon: {
        height:50, 
        width:50, 
        borderRadius:50, 
        borderWidth:1,
        resizeMode:'cover'
    }
})