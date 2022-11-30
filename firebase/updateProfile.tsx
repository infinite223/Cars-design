import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../hooks/useAuth';
import { User } from '../utils/types';
import useAuth from './../hooks/useAuth';
import { uploadImage } from './uploadImages';

export const updateProfile = async (user:any, name:string, image:any, place:any, description:string, setMessage: (value: {message:string, type:string}) => void) => {
    let urlImage = ''
    const setUrlImage = (uri:string, image:any) => {
       urlImage = uri
    }
    
    image&&uploadImage(image, true, '', '', user.uid, setUrlImage)
    
    const profileData:User = {
        name,
        description:description,
        email:user.email,
        imageUri:urlImage, 
        place: {latitude: place.place.latitude,longitude: place.place.longitude, city:place.place.description},
        uid:user.uid,

    }

    console.log(profileData)

    console.log(profileData)
    await setDoc(doc(db, "users", user.uid), profileData)
    .then((a)=> setMessage({type:"SUCCESS", message:'Profile was updated'}))
    .catch((e) => setMessage({type:"ERROR", message:'Error'}))
 }

export const deleteProfile = () => {

}
