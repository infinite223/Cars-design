import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { selectLanguage } from './../../slices/languageSlice';
import { TouchableOpacity } from 'react-native';
import { selectPrompt, setPrompt } from '../../slices/promptSlice';
import { blockPerson } from './../../firebase/chats/block';

interface AlertModalProps {
    show:boolean,
    message:string,
    type: string,
    resetError: (value:{ type: string, show:boolean, message:string}) => void
}
const widthScreen = Dimensions.get('screen').width
const PrompttModal:React.FC<{}> = () => {
    const theme = useSelector(selectTheme)
    const language = useSelector(selectLanguage)
    const prompt = useSelector(selectPrompt)
    const dispatch = useDispatch()

    console.log(prompt, 'tuu')

   const chooseOption = () => {
    switch (prompt.type) {
        case 'block':
            if(prompt.id){
                blockPerson(prompt.id)
                .then(() => dispatch(setPrompt({show:false})))
            }
            break;
    
        default:
            break;
    }
   }
    
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={prompt.show}
        onRequestClose={() => {}}
  >
    <View style={[style.modal, {backgroundColor: 'rgba(1, 1, 1, .5)'}]}>
    <View style={{
        width:"70%", 
        top:-50,
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor:theme.background,
        paddingHorizontal:10,
        paddingVertical:15,
        borderColor:theme.backgroundContent,
        borderWidth:2,
        borderRadius:15,
    }}>
        <Text style={{color: theme.fontColor, fontSize:17, marginTop:10, marginBottom:30}}>
            {prompt.message}
        </Text>
        <View style={{flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
            <TouchableOpacity
                onPress={()=> dispatch(setPrompt({show:false}))}
                style={{
                    backgroundColor:theme.background, borderColor: theme.backgroundContent, borderRadius:10,
                    alignItems:'center', justifyContent:'center'
            }}>
                    <Text style={{color:theme.fontColor, fontSize:18, paddingHorizontal:20, paddingVertical:5}}>Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={chooseOption}
                style={{
                    backgroundColor: theme.background, borderColor: theme.backgroundContent, borderRadius:10,
                    alignItems:'center', justifyContent:'center'
            }}>
                    <Text style={{color:theme.fontColor, fontSize:18, paddingHorizontal:20, paddingVertical:5}}>Yes</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  </Modal>
  )
}

export default PrompttModal

const style = StyleSheet.create({
    modal: {
       width:'100%',
       height:'100%',
       alignItems:'center',
       justifyContent:'center'
    },
    alertContainer: {
        width:'90%',

        backgroundColor:'rgba(140, 40, 40, .9)',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:15,
        paddingHorizontal:20,
        paddingVertical:15
    },
    message: {
        fontSize: 14,

    }
})