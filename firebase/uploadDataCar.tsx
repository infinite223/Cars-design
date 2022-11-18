import { Car, Error, HistoryCar, Image } from "../utils/types";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../hooks/useAuth";

export const uploadDataCar = async (
    carData:any, 
    stages:HistoryCar[],
    firebaseImagesUri: Image[],
    userUid:string, 
    language:string,  
    setShowError: (value:Error)=>void,
) => {
    console.log(firebaseImagesUri, 'ddd')
     const finishCarData:Car = {
        CarMake:carData.make,
        model:carData.model,
        likes:0,
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
    console.log(finishCarData)
    await setDoc(doc(db, "Projects", userUid), finishCarData)
      .then(s=>console.log(s))
      .catch(e=>console.log(e))
}