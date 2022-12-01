import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../hooks/useAuth';
import { User } from '../utils/types';
import useAuth from './../hooks/useAuth';
import { Alert } from 'react-native';
import { uploadImage } from './uploadImages';

export const updateProfile = async (user:any, name:string, image:any, place:any, description:string, setShowAlert: (value: {show:boolen, message:string, type:string}) => void) => {
    let urlImage = user.image?user.image:user.imageUri
    const setUrlImage = (uri:string, image:any) => {
       urlImage = uri
       console.log(uri)
    }
    
    image?.length>0&&uploadImage(image[0], true, '', '', user.uid, setUrlImage)
    
    
    setTimeout( async ()=>{
        const profileData:User = {
            name,
            description:description,
            email:user.email,
            imageUri:urlImage, 
            place: {
                latitude: place.region.latitude,
                longitude: place.region.longitude, 
                city:place.place.description
            },
            uid:user.uid,
            stats: {
                followers:user.stats?user.stats.followers:0,
                views:user.stats?user.stats.views:0,
                following:user.stats?user.stats.following:0 
            }
        }
    
        await setDoc(doc(db, "users", user.uid), profileData)
        .then((a)=> setShowAlert({show:true, type:"SUCCESS", message:'Profile was updated'}))
        .catch((e) => setShowAlert({show:true, type:"ERROR", message:'Something went wrong'}))
     }, 2000)
 }

export const deleteProfile = () => {

}
