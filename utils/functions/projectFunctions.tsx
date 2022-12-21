import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Share } from 'react-native';
import { db } from '../../hooks/useAuth';
import { UserList } from '../types';

export const onShare = async (carMake:string, model:string, link:string) => {
    try {
      const result = await Share.share({
        message:
          `Cars projects- ${carMake+ ' ' +model+' ' + link}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
    
    }
};

export const likeProject = async (id:string, authorUid:string, user:UserList) => {
  console.log(user)
  if(authorUid!==user.uid){
    await updateDoc(doc(db, `users/${authorUid}/projects`, id), {
      'car.likes':arrayUnion({name:user.name, uid:user.uid, imageUri: user.imageUri})
    })
    .then(()=> console.log('xd'))
    .catch(e=>console.log(e))
  }
}