import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import _Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import _Icon_Ionicons from 'react-native-vector-icons/Ionicons'

export const StatusProblem:FC<{status: 'resolved' | 'Unresolved', showStatus:boolean}> = ({showStatus, status}) => {
  return (
    <View style={[localStyles.container, status==="resolved"?localStyles.resolved:localStyles.unresolved]}>
        {status==='resolved'?
        <>
            {/* <IoCheckmarkDoneCircleSharp size={14}/> */}
            <View style={{marginLeft:showStatus?5:0}}>
                <_Icon_Ionicons name={'checkmark-circle-outline'} size={17} color={'white'} style={{ marginRight: 0 }}/>

                {showStatus&&<Text style={localStyles.text}>
                    Rozwiązany
                </Text>}
            </View>
        </>:
        
        <>
            {/* <FiHelpCircle size={14}/> */}

            <View style={{marginLeft:showStatus?5:0, flexDirection:'row'}}>
                <_Icon_MaterialIcons name={'error-outline'} size={17} color={'white'} style={{ marginRight: 0 }}/>
                {showStatus&&<Text style={localStyles.text}>
                   nierozwiązany
                </Text>}
            </View>
        </>}
    </View>
  )
}

const localStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 50,
        padding: 7,
        color: 'white',
        fontSize: 12,
        paddingHorizontal:10
        // width: 100
    },
    resolved: {
        backgroundColor: 'rgb(3, 157, 3)'
    },
    unresolved: {
        backgroundColor: 'rgb(183, 120, 3)'

    },
    text: {
        color: 'white',
        marginLeft: 5,
        fontSize:13
    }
})

