import { AlertProps, CarprojectData, HistoryCar, Image, User } from "../../utils/types";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../hooks/useAuth";


export const uploadDataCar = async (
    user:User,
    project_id:string,
    carData:any, 
    stages:HistoryCar[],
    links:{ig:string, yt:string, fb:string},
    firebaseImagesUri: Image[],
    soundCheckFirebaseUri:string,
    language:string,  
) => {
        if(firebaseImagesUri.length>0){
            const finishCarData:CarprojectData = {
                author:{uid:user.uid, imageUri:user.imageUri, name:user.name},
                id:project_id,
                createdAt:serverTimestamp(),
                place: user.place,
                car: {
                    CarMake:carData.make,
                    model:carData.model,
                    soundCheck:soundCheckFirebaseUri,
                    links,
                    likes:[],
                    description:carData.description,
                    performance: [
                        {type:'hp', value:carData.power},
                        {type:'nm', value: carData.torque},
                        {type: '_0_100', value:carData._0_100},
                        {type: '_100_200', value:carData._100_200}
                    ],
                    history:stages,
                    imagesCar: firebaseImagesUri,
                }
        } 
        const errorMessage = language==='pl'
        ?'Coś poszło nie tak, spróbuj później'
        :'Something went wrong, please try again later' 

        const successMessage = language==='pl'
        ?'Projekt został dodany'
        :'Project was added' 
        
        const uploadDataCar = new Promise<AlertProps>(async (resolve, reject) => {
            await setDoc(doc(db, `users/${user.uid}/projects`, project_id), finishCarData)
            .then(s=> {
                return resolve({type:'SUCCESS', show:true, message: successMessage})
            })
            .catch(e=> {
                return reject({type:'ERROR', show:true, message: errorMessage})
            })
        });

        return uploadDataCar
    }
}