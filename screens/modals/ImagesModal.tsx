import { View, Text, Modal, Alert, Dimensions, Animated, StyleSheet, Image } from 'react-native'
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { FlatList } from 'react-native-gesture-handler';


const ImagesModal:React.FC<{modalVisible:boolean, setModalVisible: (value:boolean) => void, photos:string[], index: number}> = ({modalVisible, setModalVisible, photos, index}) => {
    
    const theme = useSelector(selectTheme)
    const widthScreen = Dimensions.get('screen').width
    const scrollX = useRef(new Animated.Value(0)).current

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[style.mainContainer, {backgroundColor: theme.background}]}>   
          <View style={StyleSheet.absoluteFillObject}>
            {photos.map((photoUri, index)=> {
              const inputRange = [
                (index - 1) * widthScreen,
                index * widthScreen,
                (index + 1) * widthScreen 
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange:[0,1,0]
              })
              return <Animated.Image 
                key={`photo-${index}`}
                source={{uri: photoUri}}
                style={[
                  StyleSheet.absoluteFillObject,
                  {opacity: opacity}
                ]}
                blurRadius={50}
               />
            })}
          </View>   
          <Animated.FlatList
            data={photos}
            initialScrollIndex={index}
            pagingEnabled
            horizontal
            onScroll={Animated.event(
              [{nativeEvent: { contentOffset: {x: scrollX} }}],
              { useNativeDriver: true }
            )}
            renderItem={({item})=> <View style={[style.renderPhoto, {width:widthScreen}]}>
               <Image style={{width:350, height:220, resizeMode: 'cover', borderRadius:10}} source={{uri: item}}/>
            </View>          
            }   
          />              
        </View>
      </Modal>
  )
}

export default ImagesModal

const style = StyleSheet.create({
    mainContainer: {       
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
    headerText: {
        fontSize:20,
    },
    renderPhoto: {
      justifyContent:'center', 
      alignItems:'center',
      shadowColor: "#000", 
      shadowOpacity: .5, 
      shadowOffset: {width: 0, height: 0}, 
      shadowRadius:20, 
      elevation:50,      
    }
})