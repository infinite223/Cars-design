import { Icon } from '@rneui/base';
import React, { Component, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { HistoryCar, Performance } from '../../utils/types'
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
  setStages: (value: HistoryCar[]) => void,
  showAddComponentModal:boolean,
  setShowAddComponentModal: (vale: boolean) => void,
  activeSections:number[],
  setActiveSections: (vale: number[]) => void,
}

export const AccordionView:React.FC<AccordionViewProps> = ({stages, setStages, showAddComponentModal, setShowAddComponentModal, activeSections, setActiveSections}) => {
  const theme = useSelector(selectTheme)
  const [performance, setPerformance] = useState<Performance[]>([
    [{type:'hp', value:0},{type:'nm', value:0},{type:'_0_100', value:0}, {type:'_100_200', value:0}]])

  useEffect(() => {
    (stages.length>0 && stages)&&setActiveSections([stages.length-1])

    if(!performance[activeSections[0]]){
      setPerformance([...performance, [{type:'hp', value:0},{type:'nm', value:0},{type:'_0_100', value:0}, {type:'_100_200', value:0}]])
    }
  }, [stages])

  const editStage = (param:any, type: string) => {
    const newStages = stages

    let newPerformance = performance

    switch (type) {
      case 'component':
        newStages[activeSections[0]].components?.push({icon:'', name: param.name, type:param.type, description:param.description}) 
        break;
      case 'description':
        newStages[activeSections[0]].description = param
        break;
      case 'hp':
        newPerformance[activeSections[0]][0].value = param
        setPerformance(newPerformance)
        break
      case 'nm':
        newPerformance[activeSections[0]][1].value = param
        setPerformance(newPerformance)
        break
      case '_0_100':
    
            let dataToEdit1 =  newPerformance[activeSections[0]] 
            if( dataToEdit1[2]){
              dataToEdit1[2].value = param
              newPerformance[activeSections[0]][2] = dataToEdit1[2]
              setPerformance(newPerformance)
            }
   
        break
      case '_100_200':
        let dataToEdit2 = newPerformance[activeSections[0]] 
        if( dataToEdit2[3]){
          dataToEdit2[3].value = param
          newPerformance[activeSections[0]][3] = dataToEdit2[3]
          setPerformance(newPerformance)
        }
        break

      default:
        break;
    }
    newStages[activeSections[0]].performance = performance[activeSections[0]]
    setStages(newStages)
    console.log(stages)

  }

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
    
    return (
      <View style={[style.stageContent, theme.background==='black'?{backgroundColor: "#151515"}:{backgroundColor:'#cdc'}]}>
        {showAddComponentModal&&<AddComponentModal setComponent={(param)=>editStage(param, 'component')} modalVisible={showAddComponentModal} setModalVisible={setShowAddComponentModal}/>}
        <View style={{height:1}}></View>
        <CustomInput fontSize={15} placeholder='Type stage description' setValue={(val)=>editStage(val, 'description')} max={100}/> 
        <CustomInput fontSize={15} placeholder='Type power (hp)' performance='hp' helpText='( np. 350 )'   setValue={(text)=>editStage(text, 'hp')} max={100}/>
        <CustomInput fontSize={15} placeholder='Type torque (Nm)' performance='nm'  helpText='( np. 431 )'  setValue={(text)=>editStage(text, 'nm')} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 0-100km/h (s)' performance='_0_100'  helpText='( np. 5.2 )' setValue={(text)=>editStage(text, '_0_100')} max={100}/>
        <CustomInput fontSize={15} placeholder='Type 100-200km/h (s)' performance='_100_200'  helpText='( np. 14.3 )' setValue={(text)=>editStage(text, '_100_200')} max={100}/>
        
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={[{textAlign:'center', color: theme.fontColor, marginLeft:5, fontSize:15, marginVertical:10, maxWidth:150}]}>
            Add components that have been modified
          </Text>
          <TouchableOpacity onPress={()=>setShowAddComponentModal(true)} style={[style.addComponentButton, {backgroundColor:theme.backgroundContent}]}>
            <Text style={[{color:theme.fontColorContent, fontSize:40}]}>+</Text>
          </TouchableOpacity>
        </View>
        
          <FlatList
            data={stage.components}
            ItemSeparatorComponent={()=><View style={{width:15}}/>}
            ListFooterComponent={() => (
               <></>
            )}
            horizontal
            renderItem={({item, index})=>(
              <TouchableOpacity onLongPress={()=>removeComponent(index)} style={[style.component, {backgroundColor: 'rgba(111,111,111, .1)'}]}>
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
     
      </View>
    );
  };

    return (
        <Accordion
          underlayColor={theme.background}
          sections={stages}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={(x:any)=>setActiveSections(x)}
        />     
    );
}