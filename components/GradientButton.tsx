import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

export const GradientButton: React.FC<{text:string}> = ({ text }) => {

    return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2d3", "#3b4", "#2c2"]}
        start={{x:1, y:2}}
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
  },
  buttonContainer: { 
    padding: 5, 
    paddingHorizontal:45,
    alignItems: "center", 
    borderRadius: 15 
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  }
});