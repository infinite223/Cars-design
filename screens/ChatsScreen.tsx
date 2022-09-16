import { View, Text } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';

const ChatsScreen = () => {
    const navigation:any = useNavigation()
    const route = useRoute<any>()
    const authorUid = route.params;
    console.log(authorUid)
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatsScreen