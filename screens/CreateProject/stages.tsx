import { Icon } from '@rneui/base';
import React, { Component, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { HistoryCar } from '../../utils/types'
import CustomInput from '../../components/CustomInput';
import { ScrollView } from 'react-native-gesture-handler';

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
  setStages: (value: HistoryCar[]) => void
}

export const AccordionView:React.FC<AccordionViewProps> = ({stages, setStages}) => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const theme = useSelector(selectTheme)

  useEffect(() => {
    (stages.length>0 && stages)&&setActiveSections([stages.length-1])
  }, [stages])

  const editStage = () => {
    // edit stages....
  }
  

  const _renderHeader = (stage:HistoryCar) => {
    return (
      <View style={[style.stageComponent, {justifyContent:'space-between', paddingHorizontal:10, borderColor: theme.backgroundContent}]}>
        <View style={{alignItems:'center', flexDirection:'row'}}>
          {stage.name&& (stages.length-1<parseInt(stage.name.charAt(stage.name.length-1))&&
          <TouchableOpacity 
            onPress={()=>setStages(stages.filter(_stage=>_stage.name!==stage.name))} 
            style={[style.removeStage, {backgroundColor:theme.backgroundContent}]}
          >
            <Icon type='entypo' name='minus' size={22} color={theme.fontColor}/>
          </TouchableOpacity>)}
          <Text style={{color: theme.fontColor, paddingVertical:7, fontSize:16}}>{stage.name}</Text>
        </View>

        <Icon type='materialicon' name='keyboard-arrow-down' size={22} color={theme.fontColorContent}/>
      </View>
    );
  };

  const _renderContent = (stage:HistoryCar) => {
    return (
      <View style={[style.stageContent]}>
        <View style={{height:1}}></View>
        <CustomInput fontSize={15} placeholder='Type stage description' setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type power (hp)' performance='hp' helpText='( np. 350 )' setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type torque (Nm)' performance='nm'  helpText='( np. 431 )'  setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 0-100km/h (s)' performance='_0_100'  helpText='( np. 5.2 )'  setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 100-200km/h (s)' performance='_100_200'  helpText='( np. 14.3 )'  setValue={()=>editStage()} max={100}/>

      </View>
    );
  };

    return (
        <Accordion
          sections={stages}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={(x:any)=>setActiveSections(x)}
        />     
    );
}