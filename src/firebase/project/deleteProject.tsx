import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../hooks/useAuth"
import { getStorage, deleteObject, ref, listAll, list } from "firebase/storage"
import { storage } from "../../hooks/useAuth";
import { AlertProps } from "../../utils/types";
const bucketName = "yourappname.appspot.com";

export const deleteProject = (userUid:string, setShowAlert: (value:AlertProps) => void, projectId?:string) => {
    if(projectId && userUid){
            const projectRef = ref(storage, `${userUid}/1a1e0c83-cf11-4e97-b9b3-665cd19d22ae`);
            listAll(projectRef).then(function(result) {
                result.items.forEach(function(fileRef) {
                // fileRef.delete();
                // console.log(fileRef)
                });
            }).catch((error) => {
                console.log(error)
                setShowAlert({show:true, message:'Error', type:'ERROR'})
            });
            // deleteObject(projectRef).then(() => {
            //     setShowAlert({show:true, message:'Project was deleted', type:'SUCCESS'})
            // }).catch((error) => {
            //     setShowAlert({show:true, message:'Error', type:'ERROR'})
            // });
        // deleteDoc(doc(db, `users/${userUid}/projects`, projectId))
        // .then( async (e)=>{
        //     const storage = getStorage()
        //     const projectRef = ref(storage, `${userUid}/${projectId}`);
        //     deleteObject(projectRef).then(() => {
        //         setShowAlert({show:true, message:'Project was deleted', type:'SUCCESS'})
        //     }).catch((error) => {
        //         setShowAlert({show:true, message:'Error', type:'ERROR'})
        //     });
        // }) 
        // .catch(()=>{
        //     setShowAlert({show:true, message:'Error', type:'ERROR'})
        // }) 
        // .finally(()=> {
        //     setShowAlert({show:true, message:'Project was deleted', type:'SUCCESS'})
        // })
    }
}