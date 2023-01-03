import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { AlertProps } from "../utils/types";
import { getResizeImage } from "./getResizeImage";

export const uploadImage = async (
        image:any, 
        project_id:string, 
        profileImage:boolean, 
        userUid:string, 
        setUrl:(uri:string, image:any)=>void,
        setShowAlert: (value: AlertProps)=> void
    ) => {
    const storage = getStorage();
    const resizeImage = await getResizeImage(image.uri)
    const response = await fetch(resizeImage.uri)

    const blob = await response.blob()
    const immageFullName = image.uri.split('/')[image.uri.split('/').length-1]
    
    const storageRef = ref(storage, `${userUid}/${profileImage?'profile':project_id}/${immageFullName}`);
    console.log(userUid)

    const promise = new Promise(async (resolve, reject) => { 
        uploadBytesResumable(storageRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(progress===100){
                    console.log('100', url)
                    resolve({url:url, image:image})
                }
            });
        })
        .catch((e) => {
            reject('error')
            console.log(e)
        })
    })

   return promise
}