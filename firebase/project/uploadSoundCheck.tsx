import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { AlertProps } from "../../utils/types";
import { getResizeImage } from "./../getResizeImage";

export const uploadSoundChcek = async (
        soundCheckUri:string, 
        project_id:string, 
        userUid:string, 
    ) => {
    const storage = getStorage();
    // const resizeImage = await getResizeImage(image.uri)
    const response = await fetch(soundCheckUri)

    const blob = await response.blob()
    // const soundFullName = sound.uri.split('/')[sound.uri.split('/').length-1]
    
    const storageRef = ref(storage, `${userUid}/${project_id}/soundCheck`);

    const promise = new Promise<string>(async (resolve, reject) => { 
        uploadBytesResumable(storageRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url:string) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(progress===100){
                    console.log('100', url)
                    resolve(url)
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