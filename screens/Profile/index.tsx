import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { data } from '../../utils/data';
import EditProfileScreen from './../modals/SettingsModals/EditProfileModal';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { style } from './style';

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const { user, logout }:any = useAuth()
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText } = translations.screens.ProfileScreen

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:10, fontSize:20, color:theme.fontColor}}>{data[0].author.name}</Text>,
           headerLeft: () => (
            <View style={style.headerLeftContainer}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:5}}>
                    <Icon
                        size={24}
                        name='arrow-back-ios'
                        type='MaterialIcons'
                        color={theme.fontColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{marginVertical:10}} onPress={() => setEditProfileModalVisible(true)}>
                    <Avatar
                        size={34}
                        rounded
                        source={{uri:data[0].author.imageUri}}    
                    />
                </TouchableOpacity>
            </View>
          ),
          headerRight: () => <View style={style.headerRightContainer}> 
           <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{paddingHorizontal:5}}>           
                <Icon
                    name='post-add'
                    type='materialicon'
                    size={27} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={{paddingHorizontal:5}}>   
                <Icon                 
                    name='ios-settings-outline'
                    type='ionicon'
                    size={27} 
                    color={theme.fontColor}
                />
            </TouchableOpacity>
          </View>
        })  
      }, [theme])
    
  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        <EditProfileScreen modalVisible={editProfileModalVisible} setModalVisible={setEditProfileModalVisible}/>
        <View style={{marginVertical:5}}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>
                {language==="en"?headerText.en:headerText.pl}
            </Text>
            <Text style={{color:theme.fontColorContent}}>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.a
                 Blanditiis, nostrum...
            </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Create')} style={[style.editButton, {backgroundColor: '#272'}]}>
            <Text style={[{color:'#ddd', fontSize:15, letterSpacing:1}]}>ADD PROJECT CAR</Text>
        </TouchableOpacity>

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
                        <Icon                 
                            name='heart'
                            type='evilicon'
                            size={28} 
                            color={theme.fontColor}
                        />
                    </TouchableOpacity>}
            />
        </View>
    </View>
  )
}

export default ProfileScreen

