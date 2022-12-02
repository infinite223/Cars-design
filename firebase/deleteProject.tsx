import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../hooks/useAuth"

export const deleteProject = (userUid:string, setShowAlert: (value: {show:boolean, message:string, type:string}) => void, projectId?:string) => {
    if(projectId && userUid){
        deleteDoc(doc(db, `users/${userUid}/projects`, projectId))
        .then((e)=>{
            setShowAlert({show:true, message:'Project was deleted', type:'SUCCESS'})
        }) 
        .catch(()=>{
            setShowAlert({show:true, message:'Error', type:'ERROR'})
        }) 
    }
}