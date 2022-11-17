import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

export const GradientButton: React.FC<{text:string}> = ({ text }) => {

    return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2f3", "#5b5", "#292"]}
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
    marginVertical:20
  },
  buttonContainer: { 
    padding: 7, 
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