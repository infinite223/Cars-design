import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImages = async (images:any, make:string, model:string, user:any) => {
    const storage = getStorage();
    const response = await fetch(images[0].uri)
    const blob = await response.blob()
    const immageFullName = images[0].uri.split('/')[images[0].uri.split('/').length-1]
    const storageRef = ref(storage, `${user.uid}/${make}-${model}/${immageFullName}`);


    try {
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log(snapshot)
            console.log('Uploaded a blob or file!');
        });
    } catch (error) {
        console.log(error)
    }
}