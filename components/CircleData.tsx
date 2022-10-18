import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from './../slices/themeSlice';

export const CircleData:React.FC<{type:string, number:number, colors:string[]}> = ({type, number, colors}) => {
  
  const theme = useSelector(selectTheme)

  const getType = () => {
    let correctType
    switch (type) {
      case "hp":
          correctType = "HP"
        break;
      case "nm":
          correctType = "Nm"
        break;
      case "_0_100":
          correctType = "0-100km/h"
        break;
      case "_100_200":
          correctType = "100-200km/h"
        break;
    }
    return correctType
  }

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
    spinValue,
      {
       toValue: 1,
       duration: 15000,
       easing: Easing.linear,
       useNativeDriver: true
      }
    )
   ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Animated.View style={[{transform: [{rotate: spin}]}]}>
      <LinearGradient
          colors={colors}
          style={styles.grediant}
          >
          </LinearGradient>
          </Animated.View>
          <View style={[styles.buttonContainer, {backgroundColor:theme.background}]}>
            <Text style={{color:theme.fontColor, fontSize:12, textAlign:'center'}}>{getType()}</Text>
            <Text style={{color:colors[0], fontWeight:'bold', fontSize:18}}>{number}</Text>  
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1.0,
      position:'relative',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#ecf0f1',
      // paddingHorizontal:5
  },
  grediant: {
      height: 105,
      width: 105,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius:50,
  },
  buttonContainer: {
      position:'absolute',
      height: 100,
      width: 100,
      flex: 1.0,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems:'center',
      margin: 2,
      borderRadius:50
  },
  buttonText: {
      textAlign: 'center',
      color: '#4C64FF',
      alignItems:'center',
  }
});
