import { Car, Error, HistoryCar } from "../utils/types";

export const uploadDataCar = (
    carData:any, 
    stages:HistoryCar[],
    userUid:string, 
    language:string,  
    setShowError: (value:Error)=>void
) => {
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
        imagesCar: []
    } 
    console.log(finishCarData)
    // await setDoc(doc(db, "Projects", user.uid), finishCar)
    //   .then(s=>console.log(s))
    //   .catch(e=>console.log(e))
}