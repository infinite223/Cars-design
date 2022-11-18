import { Error, HistoryCar } from "../utils/types"
import { uploadImage } from "./uploadImages"
import { uploadDataCar } from './uploadDataCar';

export const addProject = async (
        images:any, 
        carData:any, 
        userUid:string, 
        language:string, 
        stages:HistoryCar[],
        setShowError: (value:Error)=>void
    ) => {
    if(userUid){
        uploadDataCar(carData, stages, userUid, language, setShowError)
        // images.forEach(async (image:any) => {
        //     await uploadImage(image, carData.make, carData.model, userUid)
        // });
    }
    else {
        const errorMessage = language==='pl'
            ?'Musisz być zalogowany aby dodać swój projekt'
            :'You must be login to add project' 
      
        setShowError({show:true, message: errorMessage})
    }
}