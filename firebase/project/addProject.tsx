import { Error, AlertProps, HistoryCar, Image } from "../../utils/types"
import { uploadImage } from "../uploadImage"
import { uploadDataCar } from './uploadDataCar';
import { v4 as uuid } from 'uuid';

export const addProject = async (
        images:any, 
        imagesStages:any[],
        carData:any, 
        userUid:string, 
        language:string, 
        stages:HistoryCar[],
        setShowAlert: (value:AlertProps)=>void
    ) => {
    if(userUid){
        const project_id = uuid();
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


        images.forEach( (image:any) => {
            uploadImage(image, project_id, false, userUid, firebaseImagesUriUpload, setShowAlert)
            .then((promise:any)=> firebaseImagesUriUpload(promise.url, promise.image))  
            .catch(() => setShowAlert({type:'ERROR', show:true, message: 'error xd'}))                            
        })
    
        imagesStages.forEach((image:any) => {
            uploadImage(image, project_id, false, userUid, firebaseImagesStagesUriUpload, setShowAlert)
            .then((promise:any)=> {firebaseImagesUriUpload(promise.url, promise.image); console.log(promise)})  
            .catch(() => setShowAlert({type:'ERROR', show:true, message: 'error'}))         
        });        
        

        setTimeout(() => {
            uploadDataCar(
                project_id,
                carData,    
                editStages, 
                firebaseImagesUri,
                userUid, 
                language, 
                setShowAlert
            )
            .then((s:AlertProps | undefined)=> {
                s&&setShowAlert(s)
                console.log('jupi', firebaseImagesUri)
                
            })
            .catch((e:AlertProps)=> {setShowAlert(e), console.log(e)})
        
        }, 3000)        
    }
    else {
        const errorMessage = language==='pl'
            ?'Musisz być zalogowany aby dodać swój projekt'
            :'You must be login to add project' 
      
        setShowAlert({type:'ERROR', show:true, message: errorMessage})
    }
}