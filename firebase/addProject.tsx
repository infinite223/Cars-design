import { Error } from "../utils/types"
import { uploadImage } from "./uploadImages"
import * as ImagePicker from 'expo-image-picker';

export const addProject = async (
        images:any, 
        make:string, 
        model:string, 
        userUid:string, 
        language:string, 
        setShowError: (value:Error)=>void
    ) => {
    if(userUid){
        images.forEach(async (image:any) => {
            await uploadImage(image, make, model, userUid)
        });
    }
    else {
        const errorMessage = language==='pl'
            ?'Musisz być zalogowany aby dodać swój projekt'
            :'You must be login to add project' 
      
        setShowError({show:true, message: errorMessage})
    }
}