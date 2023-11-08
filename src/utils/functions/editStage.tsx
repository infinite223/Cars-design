import React from "react";
import { HistoryCar, Performance } from "../types";

interface editStageProps  {
    activeSections:number[], 
    param:any | string,   
    stages:HistoryCar[],
    performance: Performance[],
    type: string, 
    setPerformance: (value:Performance[]) => void,
    setStages: (value:HistoryCar[]) => void
}

export const editStage = (
        activeSections: number[],
        param:any | string,  
        stages:HistoryCar[], 
        performance: Performance[],
        type: string, 
        setPerformance: (value:Performance[]) => void,
        setStages: (value:HistoryCar[]) => void
    ) => {
    const newStages = stages

    let newPerformance = performance

    switch (type) {
      case 'component':
        newStages[activeSections[0]].components?.push({icon:'', name: param.name, type:param.type, description:param.description}) 
        break;
       case 'company':
        newStages[activeSections[0]].company = param
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