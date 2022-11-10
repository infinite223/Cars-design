import { Icon } from '@rneui/base';
import React, { Component, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { style } from './style';
import { HistoryCar } from '../../utils/types'

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
  const [activeSections, setActiveSections] = useState([])
  const theme = useSelector(selectTheme)

  const _renderSectionTitle = (stage:HistoryCar) => {
    return (
      <TouchableOpacity style={[style.stageComponent, {backgroundColor: theme.backgroundContent}]}>
        {/* onPress={()=>setStages(stages.filter((stage)=>stage.name!==stage.name))} */}
        <TouchableOpacity  style={{paddingHorizontal:15}}>
            <Icon type='entypo' name='minus' color={theme.fontColor} size={17}/>
        </TouchableOpacity>
        <Text style={[{color: theme.fontColor, marginHorizontal:15}]}>{stage.name}</Text>
      </TouchableOpacity>
    );
  };

  const _renderHeader = (stage:HistoryCar) => {
    return (
      <View style={[style.stageComponent, {backgroundColor: theme.backgroundContent, paddingHorizontal:15}]}>
        <Text style={{color: theme.fontColor}}>{stage.name}</Text>
      </View>
    );
  };

  const _renderContent = (stage:HistoryCar) => {
    return (
      <View>
        <Text style={{color: theme.fontColor, marginHorizontal:15, marginBottom:10}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam esse consectetur dolore, ab mollitia et id nisi ducimus velit officia qui iusto. Debitis quidem at enim vel adipisci eligendi amet!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, maxime, quae reprehenderit deleniti molestiae architecto recusandae ipsa tempora, porro non velit nemo blanditiis soluta qui minus atque cum. Sunt, natus!

        </Text>
      </View>
    );
  };

    return (
      <Accordion
        sections={stages}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={(x:any)=>setActiveSections(x)}
      />
    );
}