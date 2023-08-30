import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SpecyficProblem = () => {
  return (
    <View>
      <Text style={[localStyles.headerText]}>Problem konkretny dotyczy precyzyjnie opisany problem z konkretnym elementem samochodu. Najczęściej już po wstępnej diagnostyce i ze znanymi kodami błędów</Text>
    </View>
  )
}

export default SpecyficProblem

const localStyles = StyleSheet.create({
  container: {
    
  },
  headerText: {
    
  }
})