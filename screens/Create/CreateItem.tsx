import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from '@rneui/themed';

const SCREEN_WIDTH = Dimensions.get('screen').width

interface CreateItemProps {
    name: string,
    description: string,
    navigate: string,
    gradientColors: string[],
    disabled: boolean
}

const CreateItem:FC<{data: CreateItemProps}> = ({data: { disabled, description, name, navigate, gradientColors } }) => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)

  return (
    <TouchableOpacity disabled={disabled} style={[style.createContainer, {opacity: disabled?.4:1}]} activeOpacity={.6} onPress={() => navigation.navigate(navigate)}>
        <View style={{flex: 1}}>
            <View style={style.nav}>
                <Text style={[style.textSection, {color: theme.fontColor}]}>
                    {name}
                </Text>
            </View>
          
            <Text style={[style.description, {color: theme.fontColorContent}]}>
                {description}
            </Text>

            <LinearGradient
                    colors={gradientColors}
                    locations={[0, 0.25, 0.45, 1]}
                    start={[0, 1]}   
                    end={[1, 0]}   
                    style={style.createSection}
                >
                    <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={18}/>
            </LinearGradient>
        </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    createContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical:20
    },
    createSection: {
        alignItems: 'center',
        justifyContent:'center',
        width: 45,
        height: 45,
        borderRadius:50,
        position:'absolute',
        right: 10,
        bottom:10
    },
    nav: {
        flexDirection:'row',
        alignItems:'flex-start',
        gap:10,
        marginBottom:5
        // justifyContent:'space-between',
    },
    textSection: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0,
        fontFamily: '',
        textTransform: 'uppercase'
    },
    description: {
        fontSize:13,
    }
})

export default CreateItem

