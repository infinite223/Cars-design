import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getResizeImage } from "./getResizeImage";

export const uploadImage = async (image:any, make:string, model:string, userUid:string) => {
    const storage = getStorage();
    const resizeImage = await getResizeImage(image.uri)
    const response = await fetch(resizeImage.uri)
    const blob = await response.blob()

    const immageFullName = image.uri.split('/')[image.uri.split('/').length-1]
    const storageRef = ref(storage, `${userUid}/${make}-${model}/${immageFullName}`);

    try {
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log(snapshot)
            console.log('Uploaded a blob or file!');
        });
    } catch (error) {
        console.log(error)
    }
}