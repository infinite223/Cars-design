import { CarprojectData } from "./types"

const urlImageCar = "https://th.bing.com/th/id/R.f59bb5bc1131cc89bc30a50de98fb5e0?rik=qHjGzRpR7TSxxw&riu=http%3a%2f%2fcarsradars.com%2fwp-content%2fuploads%2f2019%2f03%2fcautofotoimg_0199.jpg&ehk=E%2fpd1PO5%2fjGT9UynDb9gkaE4ARnCilDJJLWhht3u2rE%3d&risl=&pid=ImgRaw&r=0" 
const urlImageAuthor = "https://th.bing.com/th/id/R.657afe7932946deea8032c84dbcd9642?rik=o7n%2fQlA2X5Iy%2fw&pid=ImgRaw&r=0"


export const data:CarprojectData[] = [
    {
      id:"1",
      author:{ name:"Darek", email:"dasadas@gmail.com", imageUri:urlImageAuthor},
      createdAt:"02 11 2021",
      car: { 
        CarMake: "BMW", 
        model: "M4", 
        description: "Lorem ipsum dsa caef dsadsa dsdsa csa dsad sadsdads dsa ds dadsa.",
        hp:680, 
        nm:780, 
        imagesCar: [urlImageCar], 
        performance: [4.1, 7.3],
        likes:2,
        history:[  
          {date: "23 12 2009", photosUrl:["urlImageCar"], name:"Stock", description:'510hp 600Nm'},
          {date: "23 12 2009", photosUrl:["urlImageCar"], name:"Stage 1", description:'570hp 710Nm'},
          {date: "13 12 2013", photosUrl:["urlImageCar"], name:"Stage 2", description:'640hp 780Nm'}
        ]
      }
    }
  ]