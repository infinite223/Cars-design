import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../hooks/useAuth';
import useAuth from './../hooks/useAuth';

export const updateProfile = async (uid:string, name:string, image:any, place:any, description:string) => {
    const profileData = {
        uid,
        name, 
        image, 
        place: {destination:place.region, name:place.place.description}, description
    }

    console.log(profileData)
    await setDoc(doc(db, "users", uid), profileData)
    // const dbRef = collection(db, "users");
    // // console.log(dbRef)
    // await addDoc(dbRef, {xd:"s"})
    .then((a)=> console.log(a))
    .catch((e) => console.log(e))
 }

export const deleteProfile = () => {

}
