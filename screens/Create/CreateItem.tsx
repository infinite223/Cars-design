import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../slices/themeSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from '@rneui/themed';

interface CreateItemProps {
    name: string,
    description: string,
    navigate: string,
    gradientColors: string[],
    disabled: boolean,
    offersList: string[]
}

const CreateItem:FC<{data: CreateItemProps}> = ({data: { offersList, disabled, description, name, navigate, gradientColors } }) => {
    const navigation:any = useNavigation()
    const theme = useSelector(selectTheme)

  return (
    <TouchableOpacity disabled={disabled} style={[style.createContainer, {opacity: disabled?.4:1}]} activeOpacity={.6} onPress={() => navigation.navigate(navigate)}>
        <LinearGradient
            colors={[gradientColors[3], gradientColors[3], gradientColors[3], gradientColors[2]]}
            locations={[0, 0.25, 0.45, 1]}
            start={[.3, .9]}   
            end={[.5, 0]}   
            style={style.containerItem}
        >
            <View style={{flex: 1}}>
                <View style={style.nav}>
                    <Text style={[style.textSection, {color: theme.fontColor}]}>
                        {name}
                    </Text>
                </View>
            
                {description.length>0&&<Text style={[style.description, {color: theme.fontColor}]}>
                    {description}
                </Text>}

                <View style={style.footer}>
                    <FlatList style={style.infoList}
                        data={offersList}
                        contentContainerStyle={{flex:1, gap: 5, marginVertical:10}}
                        renderItem={({ item }) => 
                        <View style={{alignItems: 'center', flexDirection:'row', gap: 10}}>
                            <Icon 
                                type='feather' 
                                name="check-circle" 
                                color={gradientColors[1]} 
                                size={18}
                            />

                            <Text style={[{color: theme.fontColor}]}>{item}</Text>
                        </View>}
                    />

                    <LinearGradient
                        colors={[gradientColors[2], gradientColors[1], gradientColors[0], gradientColors[2]]}
                        locations={[0, 0.1, 0.45, 1]}
                        start={[0, 1]}   
                        end={[1, 0]}   
                        style={style.createSection}
                    >
                        <Icon type='materialicon' name="arrow-forward-ios" color={'white'} size={18}/>
                    </LinearGradient>
                </View>
            </View>
        </LinearGradient>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    containerItem: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical:15,
        borderBottomColor:'#333',
        borderWidth:1
    },
    createContainer: {
        flex: 1,
       
    },
    createSection: {
        alignItems: 'center',
        justifyContent:'center',
        width: 45,
        height: 45,
        borderRadius:50,
    },
    nav: {
        flexDirection:'row',
        alignItems:'flex-start',
        gap:10,
        marginBottom:3
        // justifyContent:'space-between',
    },
    textSection: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing:1,
        // backgroundColor:'#333',
        flex:1, 
        paddingHorizontal:5,
        paddingVertical:3,
        borderTopLeftRadiusRadius:50,
        borderTopStartRadius:0,
        borderTopRightRadiusRadius:50,
        borderRadius:5,
        marginLeft:-5,
        marginRight:-5,
        // fontFamily: 'Avenir-Black',
        // textTransform: 'uppercase'
    },
    description: {
        fontSize:13,
        fontWeight: '400'
    },
    footer: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    infoList: {

    }
})

export default CreateItem

