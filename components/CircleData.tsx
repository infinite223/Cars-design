import { View, Text, StyleSheet } from 'react-native'
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

  
  return (
    <View style={type==="100-200km/h"?{marginRight:5}:{marginRight:21}}>
     <LinearGradient
        colors={colors}
        style={styles.grediant}
        >
        <View style={[styles.buttonContainer, {backgroundColor:theme.background}]}>
          <Text style={{color:theme.fontColor, fontSize:12, textAlign:'center'}}>{getType()}</Text>
          <Text style={{color:colors[0], fontWeight:'bold', fontSize:18}}>{number}</Text>  
        </View>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1.0,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
  },
  grediant: {
      height: 105,
      width: 105,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius:50
  },
  buttonContainer: {
      flex: 1.0,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems:'center',
      width: '90%',
      margin: 2,
      borderRadius:50
  },
  buttonText: {
      textAlign: 'center',
      color: '#4C64FF',
      alignItems:'center',
  }
});
