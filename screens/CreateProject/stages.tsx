import { Icon } from '@rneui/base';
import React, { Component, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { HistoryCar } from '../../utils/types'
import CustomInput from '../../components/CustomInput';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AddComponentModal from '../modals/AddComponentModal';

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
  const [showAddComponentModal, setShowAddComponentModal] = useState(false)

  useEffect(() => {
    (stages.length>0 && stages)&&setActiveSections([stages.length-1])
  }, [stages])

  const editStage = () => {
    // edit stages....
  }
  

  const _renderHeader = (stage:HistoryCar) => {
    return (
      <View style={[style.stageComponent, {justifyContent:'space-between', paddingRight:5, borderColor: theme.backgroundContent}]}>
        <View style={{flexDirection:'row'}}>
          <Text style={[style.stageName, {color: theme.fontColor, backgroundColor:theme.backgroundContent}]}>{stage.name}</Text>
            {stage.name&& (stages.length-1<parseInt(stage.name.charAt(stage.name.length-1))&&
          <TouchableOpacity 
            onPress={()=>setStages(stages.filter(_stage=>_stage.name!==stage.name))} 
            style={[style.removeStage, {backgroundColor:'#333'}]}
          >
            <Icon type='entypo' name='trash' size={18} color={theme.fontColorContent}/> 
           </TouchableOpacity>)} 
        </View>

        <Icon type='materialicon' name='keyboard-arrow-down' size={22} color={theme.fontColorContent}/>
      </View>
    );
  };

  const _renderContent = (stage:HistoryCar) => {
    return (
      <View style={[style.stageContent]}>
        {showAddComponentModal&&<AddComponentModal setComponent={()=>editStage()} modalVisible={showAddComponentModal} setModalVisible={setShowAddComponentModal}/>}
        <View style={{height:1}}></View>
        <CustomInput fontSize={15} placeholder='Type stage description' setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type power (hp)' performance='hp' helpText='( np. 350 )' setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type torque (Nm)' performance='nm'  helpText='( np. 431 )'  setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 0-100km/h (s)' performance='_0_100'  helpText='( np. 5.2 )'  setValue={()=>editStage()} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 100-200km/h (s)' performance='_100_200'  helpText='( np. 14.3 )'  setValue={()=>editStage()} max={100}/>
        
        <Text style={[{color: theme.fontColor, marginLeft:5, fontSize:15, marginTop:5}]}>
          Add components that have been modified
        </Text>
          <FlatList
            data={stage.components}
            ItemSeparatorComponent={()=><View style={{width:10}}/>}
            ListHeaderComponent={() => (
                <TouchableOpacity onPress={()=>setShowAddComponentModal(true)} style={[style.addComponentButton, {backgroundColor:theme.backgroundContent}]}>
                  <Text style={[{color:theme.fontColorContent, fontSize:40}]}>+</Text>
                </TouchableOpacity>
            )}
            horizontal
            renderItem={({item})=>(
              <TouchableOpacity style={[style.component, {backgroundColor: 'rgba(1,1,1, .25)'}]}>
                <Text style={[style.typeComponent]}>{item.type}</Text>
                  <Image 
                    source={item.type=="turbo"?
                      require('../../assets/componentsIcons/turbo_white.png'):
                      require('../../assets/componentsIcons/engine_white.png')} 
                    style={style.imageComponent}
                  />
                <Text style={[style.nameComponent]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
     
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