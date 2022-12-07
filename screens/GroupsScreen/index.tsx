import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { style } from './style'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Avatar, Icon } from '@rneui/base';
import useAuth from '../../hooks/useAuth';
import { GroupItem } from './GroupItem';
import { createGroup } from '../../firebase/group/createGroup';

const GroupsScreen = () => {
    const navigation = useNavigation<any>()
    const theme = useSelector(selectTheme)
    const { user }:any = useAuth()

    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{marginLeft:15, fontSize:17, color:theme.fontColor}}>
            Groups
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
                {/* <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Avatar
                        size={37}
                        rounded
                        source={{uri: user.imageUri}}    
                    />
                </TouchableOpacity> */}
            </View>
          )
        })  
      }, [theme])

  return (
    <View>
        <TouchableOpacity onPress={() => createGroup()} style={style.createGroupButton}>
            <Text style={[style.createGroupText, {color: theme.fontColor}]}>CREATE GROUP</Text>
        </TouchableOpacity>

        <View>
            {/* My groups */}
            <FlatList
                data={[]}
                renderItem={({item})=> <GroupItem myGroup/>}
            />
        </View>

        <View>
            {/* Awailable popular groups, search bar with filter....*/}
            <FlatList
                data={[]}
                renderItem={({item})=> <GroupItem />}
            />
        </View>
    </View>
  )
}

export default GroupsScreen