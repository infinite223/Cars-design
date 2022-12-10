import { Icon } from '@rneui/base';
import React, { Component, useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { HistoryCar, Performance } from '../../utils/types'
import CustomInput from '../../components/CustomInput';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AddComponentModal from '../modals/AddComponentModal';
import { selectLanguage } from '../../slices/languageSlice';
import { translations } from './../../utils/translations';
import { editStage } from '../../utils/functions/editStage';
import { chooseImg } from './../../utils/functions/chooseImg';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum.dsadsadasdasdasdsadasdsada..',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

interface AccordionViewProps {
  stages:HistoryCar[],
  setStages: (value: HistoryCar[]) => void,
  showAddComponentModal:boolean,
  setShowAddComponentModal: (vale: boolean) => void,
  activeSections:number[],
  setActiveSections: (vale: number[]) => void,
  imagesStages: any[],
  setImagesStages: (value:any[]) =>void
}

export const AccordionView:React.FC<AccordionViewProps> = ({stages, setStages, showAddComponentModal, setShowAddComponentModal, activeSections, setActiveSections, imagesStages, setImagesStages}) => {
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)

  console.log(imagesStages)

  const { addComponentHeader, addImageHeader,  inputs: { descriptionText, powerText, torqueText, _0_100Text, _100_200Text, companyText } } = translations.screens.CreateScreen.stages

  const [performance, setPerformance] = useState<Performance[]>([
    [{type:'hp', value:0},{type:'nm', value:0},{type:'_0_100', value:0}, {type:'_100_200', value:0}]])

  useEffect(() => {
    (stages.length>0 && stages)&&setActiveSections([stages.length-1])

    if(!performance[activeSections[0]]){
      setPerformance([...performance, [{type:'hp', value:0},{type:'nm', value:0},{type:'_0_100', value:0}, {type:'_100_200', value:0}]])
    }
  }, [stages])

  const removeComponent = (index:number) => {
    const newStages = stages 
    newStages[activeSections[0]].components?.splice(index)
    setStages(newStages)
    setActiveSections([])
  }

  const _renderHeader = (stage:HistoryCar) => {
    return (
      <View style={[style.stageComponent, {justifyContent:'space-between', paddingRight:5, borderColor: theme.backgroundContent}]}>
        <View style={{flexDirection:'row'}}>
          <Text style={[style.stageName, {color: theme.fontColor, backgroundColor:theme.backgroundContent}]}>{stage.name}</Text>
            {stage.name&& (stages.length-1<parseInt(stage.name.charAt(stage.name.length-1))&&
          <TouchableOpacity 
            onPress={()=>setStages(stages.filter(_stage=>_stage.name!==stage.name))} 
            style={[style.removeStage, {backgroundColor: theme.backgroundContent}]}
          >
            <Icon type='entypo' name='trash' size={18} color={theme.fontColorContent}/> 
           </TouchableOpacity>)} 
        </View>

        <Icon type='materialicon' name='keyboard-arrow-down' size={22} color={theme.fontColorContent}/>
      </View>
    );
  };

  const _renderContent = (stage:HistoryCar) => {
    // 151515
    const borderColor = '#666'
    return (
      <View style={[style.stageContent, theme.background==='black'?{backgroundColor: theme.background}:{backgroundColor:'#cdc'}]}>
        {showAddComponentModal&&<AddComponentModal setComponent={(param)=>editStage(activeSections, param, stages, performance,  'component', setPerformance, setStages)} modalVisible={showAddComponentModal} setModalVisible={setShowAddComponentModal}/>}
        <View style={{height:1}}></View>
        <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?descriptionText.en:descriptionText.pl} setValue={(val)=>editStage(activeSections, val, stages, performance,  'description', setPerformance, setStages)} max={100}/> 
        <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?powerText.en:powerText.pl} performance='hp' helpText='( np. 350 )'  setValue={(val)=>editStage(activeSections, val, stages, performance,  'hp', setPerformance, setStages)} max={100}/>
        <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?torqueText.en:torqueText.pl} performance='nm'  helpText='( np. 431 )'  setValue={(val)=>editStage(activeSections, val, stages, performance,  'nm', setPerformance, setStages)} max={100}/>
        <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?_0_100Text.en:_0_100Text.pl} performance='_0_100'  helpText='( np. 5.2 )' setValue={(val)=>editStage(activeSections, val, stages, performance,  '_0_100', setPerformance, setStages)} max={100}/>
        <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?_100_200Text.en:_100_200Text.pl} performance='_100_200'  helpText='( np. 14.3 )' setValue={(val)=>editStage(activeSections, val, stages, performance,  '_100_200', setPerformance, setStages)} max={100}/>
        
        <View style={[style.container, { backgroundColor:theme.background==="black"?'#222':'rgba(150,150,150, .3)'}]}>
          <Text style={[{textAlign:'center', color: theme.fontColorContent, marginLeft:5, fontSize:15, marginVertical:10, maxWidth:150}]}>
            {language==='en'?addComponentHeader.en:addComponentHeader.pl}
          </Text>
          <TouchableOpacity onPress={()=>setShowAddComponentModal(true)} style={[style.addComponentButton, {backgroundColor:"#273"}]}>
            <Text style={[{color:'#aaa', fontSize:40}]}>+</Text>
          </TouchableOpacity>
        </View>
        
          <FlatList
            data={stage.components}
            ItemSeparatorComponent={()=><View style={{width:15}}/>}
            horizontal
            renderItem={({item, index})=>(
              <TouchableOpacity onLongPress={()=>removeComponent(index)} style={[style.component, {backgroundColor: 'rgba(21,21,21, .7)'}]}>
                <Text style={[style.typeComponent]}>{item.type}</Text>
                  <Image 
                    source={      
                      item.type==='turbo'?require('../../assets/componentsIcons/turbo_white.png'):
                      item.type==='intercooler'?require('../../assets/componentsIcons/intercooler_white.png'):
                      item.type==='engine'?require('../../assets/componentsIcons/engine_white.png'):
                      item.type==='exhaust'?require('../../assets/componentsIcons/exhaust_white.png'):
                      require('../../assets/componentsIcons/transmission_white.png')
                    }
                    style={style.imageComponent}
                  />
                <Text style={[style.nameComponent, {color: theme.fontColor}]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />  
          <CustomInput borderColor={borderColor} fontSize={15} placeholder={language==='en'?companyText.en:companyText.pl} helpText='( np. s-performance )' setValue={(val)=>editStage(activeSections, val, stages, performance,  'company', setPerformance, setStages)} max={100}/>
          {imagesStages.find((image:any)=>image.id === activeSections[0]) ===undefined?<>
          <View style={[style.container, { backgroundColor:theme.background==="black"?'#222':'rgba(150,150,150, .3)'}]}>
            <Text style={[{textAlign:'center', color: theme.fontColorContent, marginLeft:20, fontSize:15, marginVertical:10, maxWidth:150}]}>
              {language==='en'?addImageHeader.en:addImageHeader.pl}
            </Text>
            <TouchableOpacity  onPress={()=>chooseImg(imagesStages, setImagesStages, activeSections[0])} style={[style.addComponentButton, {backgroundColor:"#273"}]}>
              <Text style={[{color:'#aaa', fontSize:40}]}>+</Text>
            </TouchableOpacity>
          </View>
          </>:  
            <View style={{position:'relative'}}>
              <Image source={{ uri: (imagesStages.find((image:any)=>image.id === activeSections[0])).uri }} style={{ width: widthScreen / 1.3, height: 220, marginStart:15, borderRadius:15 }} />
              <TouchableOpacity onPress={()=>setImagesStages(imagesStages.filter((image)=>image.id!==activeSections[0]))} style={{position:'absolute', top:10, right:30, padding:4, backgroundColor:'rgba(0,0,0, .6)', borderRadius:10}}>                         
                <Icon type='entypo' name="minus" size={20} color={theme.fontColor}/>
              </TouchableOpacity>
            </View> 
          }

      </View>
    );
  };

    return (
        <Accordion
          underlayColor={theme.background}
          sections={stages}
          duration={800}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={(x:any)=>setActiveSections(x)}
        />     
    );
}