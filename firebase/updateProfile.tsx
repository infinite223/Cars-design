import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../hooks/useAuth';
import { User } from '../utils/types';
import { uploadImage } from './uploadImages';

export const updateProfile = async (user:any, name:string, image:any, place:any, description:string, setShowAlert: (value: {show:boolean, message:string, type:string}) => void, setUser: (value:User) => void ) => {
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
            place: place.region.latitude?{
                latitude: place.region.latitude,
                longitude: place.region.longitude,
                city:place.place.description
            }:user.place,
            uid:user.uid,
            stats: {
                followers:user.stats?user.stats.followers:0,
                views:user.stats?user.stats.views:0,    
                following:user.stats?user.stats.following:0 
            }
        }
        console.log(profileData)
        await setDoc(doc(db, "users", user.uid), profileData)
        .then((a)=> (setShowAlert({show:true, type:"SUCCESS", message:'Profile was updated'}), setUser(profileData)))
        .catch((e) => setShowAlert({show:true, type:"ERROR", message:'Something went wrong'}))
     }, 2000)
 }

export const deleteProfile = () => {

}
