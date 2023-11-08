import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from '../utils/globalStyles';

export const GradientButton: React.FC<{text:string}> = ({ text }) => {
  const colorsGradient_2 = ['rgb(1, 167, 220)', 'rgb(1, 127, 171)', 'rgb(10, 117, 171)']

    return (
    <View style={styles.container}>
      <LinearGradient
        colors={colorsGradient_2}
        start={{x:1, y:1}}
        style={styles.buttonContainer}
      >
        <Text
          style={styles.buttonText}
        >
          {text}
        </Text>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },
  buttonContainer: { 
    padding: 5, 
    paddingHorizontal:45,
    alignItems: "center", 
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  }
});