import { Error, HistoryCar, Image } from "../utils/types"
import { uploadImage } from "./uploadImages"
import { uploadDataCar } from './uploadDataCar';

export const addProject = async (
        images:any, 
        imagesStages:any[],
        carData:any, 
        userUid:string, 
        language:string, 
        stages:HistoryCar[],
        setShowError: (value:Error)=>void
    ) => {
    if(userUid){
        let firebaseImagesUri:Image[] = []
        let firebaseImagesStagesUri:{id:number, image:string}[] = []
        const editStages = stages


        const firebaseImagesUriUpload = (uri:string, image:any) => {
            firebaseImagesUri.push({url:uri, likes:0, place:image.place})
        }

        const firebaseImagesStagesUriUpload = (uri:string, image:any) => {
                firebaseImagesStagesUri.push({id:image.id, image:uri})
                editStages.forEach((stage, index)=> {
                   if(firebaseImagesStagesUri[index]){
                       if(firebaseImagesStagesUri[index].id === index){
                           editStages[index].photosUrl = firebaseImagesStagesUri[index].image
                       }
                   }
                })
        }

 
        images.forEach(async (image:any) => {
            uploadImage(image, carData.make, carData.model, userUid, firebaseImagesUriUpload)           
        })     
    
        imagesStages.forEach(async (image:any) => {
            await uploadImage(image, carData.make, carData.model, userUid, firebaseImagesStagesUriUpload)           
         });

         setTimeout(()=>{
            uploadDataCar(
                carData,    
                editStages, 
                firebaseImagesUri,
                userUid, 
                language, 
                setShowError
            )
         }, 4000)
         
    }
    else {
        const errorMessage = language==='pl'
            ?'Musisz być zalogowany aby dodać swój projekt'
            :'You must be login to add project' 
      
        setShowError({show:true, message: errorMessage})
    }
}