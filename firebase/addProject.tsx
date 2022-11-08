import { Error } from "../utils/types"
import { uploadImages } from "./uploadImages"

export const addProject = async (
        images:any, 
        make:string, 
        model:string, 
        userUid:string, 
        language:string, 
        setShowError: (value:Error)=>void
    ) => {
    if(userUid){
        uploadImages(images, make, model, userUid)
    }
    else {
        const errorMessage = language==='pl'
            ?'Musisz być zalogowany aby dodać swój projekt'
            :'You must be login to add project' 
      
        setShowError({show:true, message: errorMessage})
    }
}