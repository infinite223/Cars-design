import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth, { db } from '../../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import _Icon from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { RouteProp } from '@react-navigation/native';
import { style } from './style';
import { FilterProjects } from './../../components/FilterProjects';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { CarprojectData, User } from '../../utils/types';
import { BottomOptions } from '../../components/BottomOptions';
import { UsersList } from '../../components/UsersList';
import { collection, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import AlertModal from '../modals/AlertModal';
import { doc } from 'firebase/firestore';
import { globalStyles } from '../../utils/globalStyles';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


type ProfileScreenProps = {
    A: undefined;
    B: {
      state: {uid:string, displayName:string}
    };
  }

const ProfileScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<RouteProp<ProfileScreenProps, 'B'>>()
    const [showOptions, setShowOptions] = useState<{show:boolean, selectedProject: CarprojectData | null}>({show:false, selectedProject: null})
    const [showUsersList, setShowUsersList] = useState<{show:boolean, type:string, projectId?:string, users: string[] | null, headerText: string}>({show:false, type:'', projectId:'', users: null, headerText:''})
    const [showAlert, setShowAlert] = useState<{show:boolean, message:string, type?:string}>()
    const profileUser:any = route.params;
    const [userProjects, setUserProjects] = useState<any>([])
    const [search, setSearch] = useState('')
    const { user }:any = useAuth()
    const [displayUser, setDisplayUser] = useState<User>(user)
    const isMyProfile = user.uid===profileUser.uid
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const { followersText, viewsText, followingText, headerText, headerProjectsText, addProjectButton } = translations.screens.ProfileScreen

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:15, fontSize:17, color:theme.fontColor}}>
            {displayUser.name}
            </Text>,
           headerLeft: () => (
            <View style={style.headerLeftContainer}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon
                        size={24}
                        name='arrow-back-ios'
                        type='MaterialIcons'
                        color={theme.fontColor}
                    />
                </TouchableOpacity>
                {displayUser?.imageUri&&<TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Avatar
                        size={37}
                        rounded
                        source={{uri: displayUser?.imageUri}}    
                    />
                </TouchableOpacity>}
            </View>
          ),
          headerRight: ()=> (
            <>
             {!isMyProfile?
                !displayUser.stats?.followers?.find((person)=>person === user.uid)?<TouchableOpacity onPress={() => followPerson(true)} style={[style.followButton]}>
                    <Text style={style.followButtonText}>Obserwuj</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => followPerson(false)} style={[style.followButton, {backgroundColor: globalStyles.background_1}]}>
                    <Text style={style.followButtonText}>Obserwujesz</Text>
                </TouchableOpacity>:
                <View></View>
            } 
             </>
            )
        })  
      }, [theme, displayUser])

      const followPerson = async (type:boolean) => {
        await updateDoc(doc(db, "users", profileUser.uid), {
            'stats.followers': type?arrayUnion(user.uid):
            arrayRemove(user.uid)
        }).catch((e)=>console.log(e, 'error'))
        .then(()=>console.log('follow success'))
        .finally( async () =>{
            await updateDoc(doc(db, "users", user.uid), {
                'stats.following': type?arrayUnion(displayUser.uid):
                arrayRemove(displayUser.uid)
            }).catch((e)=>console.log(e, 'error'))
            .then(()=>console.log('following success'))
        })
      }

      const translateX = useSharedValue(-1200)

      const rAllContentSheetStyle = useAnimatedStyle(() => {  
        return {       
            transform: [{translateY: translateX.value}]
        }
      })          

      useEffect(() => {
        console.log(displayUser.uid, 'dsa')
        const userRef = doc(db, 'users', profileUser.uid)

        const unsubscribe2:any =  onSnapshot(userRef, (snapshot)=> {
            if(snapshot.exists() && snapshot.data()){
                const snapshotData:any = snapshot
                setDisplayUser(snapshotData.data())
            }
        }); 
        
        const getUserData = async () => {
            if(!isMyProfile){
                const findUser = displayUser.stats.views.find((person)=>person === user.uid)
                if((findUser !== user.uid)===true){
                    const unsubscribe = async () => {
                        await updateDoc(doc(db, "users", profileUser.uid), {
                            'stats.views': arrayUnion(user.uid)
                        }).catch((e)=>console.log(e, 'error'))
                        .then(()=>console.log('succedsadas'))
                    }
                    unsubscribe()
                }
            }
        }
        
        const projectsRef = collection(db, 'users', profileUser.uid, 'projects')
        const unsubscribe =  onSnapshot(projectsRef, (snapchot) => { 
            setUserProjects(snapchot.docs.map((doc, i)=> {
                return doc.data()
            }))      
        })

        //  if(!isMyProfile){
            getUserData()
        //  }

         return () => {
            unsubscribe
            unsubscribe2
         } 
      }, [])


  return (
    <View style={[style.mainContainer, {backgroundColor:theme.background}]}>
        {(showAlert && showAlert.type)&&<AlertModal resetError={setShowAlert} show={true} message={showAlert?.message} type={showAlert?.type}/>}
      <Animated.View style={[rAllContentSheetStyle, {backgroundColor:`rgba(1, 1, 1, .5)`, zIndex:9, position:'absolute', width: SCREEN_WIDTH, height:SCREEN_HEIGHT+100}]}/>
        <View style={{marginVertical:5}}>
            <Text style={[style.headerText, {color:theme.fontColor}]}>
                {language==="en"?headerText.en:headerText.pl}
            </Text>
            <Text style={{color:theme.fontColorContent}}>
                {displayUser.description}
            </Text> 
        </View>


        <View style={[style.infoContainer, {borderBottomColor: theme.backgroundContent, borderTopColor: theme.backgroundContent}]}>
            <TouchableOpacity onPress={() => setShowUsersList({show:true, type:'followers', projectId:displayUser.uid, users:displayUser.stats?.followers, headerText:displayUser?.stats.followers?.length+` followers`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followersText.en:followersText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>{displayUser.stats?.followers?.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled onPress={() => setShowUsersList({show:true, type:'views', users:displayUser.stats?.views, headerText:displayUser.stats.views?.length+` views`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?viewsText.en:viewsText.pl}</Text>
                <Text style={{fontSize:20,  color: theme.fontColor}}>{displayUser.stats?.views?.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowUsersList({show:true, type:'following', projectId:displayUser.uid, users:displayUser.stats.following, headerText:displayUser.stats?.following?.length+` followed`})} style={style.itemInfo}>
                <Text style={{color:theme.fontColorContent}}>{language==="en"?followingText.en:followingText.pl}</Text>
                <Text style={{fontSize:20, color: theme.fontColor}}>{displayUser.stats?.following?.length}</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginVertical:0, position:'relative'}}>
            <Text style={[style.titleText, {color:theme.fontColor}]}>{language==="en"?headerProjectsText.en:headerProjectsText.pl}</Text>        
            <View style={[style.searchContainer, {backgroundColor: theme.background==="black"?"#222":'#ddd'}]}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Icon type='evilicon' name='search' size={30} color={theme.fontColorContent}/>
                    <TextInput
                        style={{color: theme.fontColor, marginLeft:10}}
                        placeholder={`Search ${isMyProfile&&'my'} project`}
                        placeholderTextColor={theme.fontColorContent}
                        onChangeText={setSearch}
                    />
                </View>
                {isMyProfile&&<TouchableOpacity onPress={() => navigation.navigate('Create')} style={[style.addProjectButton, {backgroundColor: globalStyles.background_1}]}>
                    <_Icon name="plus" size={22} color={'white'}/>
                </TouchableOpacity>}
            </View>
           
            <FilterProjects setShowUsersList={setShowUsersList} userProjects={userProjects} input={search} edit={isMyProfile} showOptions={showOptions.show} setShowOptions={setShowOptions}/>  
            {showUsersList.projectId&&<UsersList projectId={showUsersList.projectId} isMyProfile showUsersList={showUsersList} translateX={translateX} setShowUsersList={setShowUsersList}/>}
            <BottomOptions setShowAlert={setShowAlert} isMyProfile={isMyProfile} translateX={translateX} showOptions={showOptions} setShowOptions={setShowOptions}/> 
        </View>
    </View>
  )
}

export default ProfileScreen

