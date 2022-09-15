import { CarprojectData } from "./types"

const urlImageCar1 = "https://th.bing.com/th/id/R.f59bb5bc1131cc89bc30a50de98fb5e0?rik=qHjGzRpR7TSxxw&riu=http%3a%2f%2fcarsradars.com%2fwp-content%2fuploads%2f2019%2f03%2fcautofotoimg_0199.jpg&ehk=E%2fpd1PO5%2fjGT9UynDb9gkaE4ARnCilDJJLWhht3u2rE%3d&risl=&pid=ImgRaw&r=0" 
const urlImageCar2 = 'https://th.bing.com/th/id/R.e6219b8599871949d22e6da815c40436?rik=S9DPx%2frtLqwTZw&riu=http%3a%2f%2fwww.e-tapetki.pl%2ftapetki%2fduze%2f218679_bmw-m4.jpg&ehk=sT%2b0n%2fgwxf%2bkKWGDwwqsHxHWNOp%2beaIO7mY32DITMuw%3d&risl=&pid=ImgRaw&r=0'
const urlImageAuthor = "https://th.bing.com/th/id/R.657afe7932946deea8032c84dbcd9642?rik=o7n%2fQlA2X5Iy%2fw&pid=ImgRaw&r=0"
const urlImageCar3 = 'https://s1.cdn.autoevolution.com/images/news/gallery/new-bmw-m3-and-m4-hd-wallpapers-are-here_118.jpg'
const urlImageCar4 = 'https://www.autolimite.com/wp-content/uploads/2014/01/01_BMW-M4-Coupe-2014.jpg'
const urlImageCar5 = 'https://www.autocentrum.pl/ac-file/car-version/5c125c7a57502a01894bdd23/bmw-seria-4-f32-33-36-m4-coupe.jpg'
const urlImageCar6 = 'https://i.pinimg.com/originals/47/9e/4b/479e4bba13f9aac5040f2f80e5678041.jpg'

export const data:CarprojectData[] = [
    {
      id:"1",
      author:{name:"Darek", email:"dasadas@gmail.com", imageUri:urlImageAuthor, place:"Kraków"},
      createdAt:"02 11 2021",
      car: { 
        CarMake: "BMW", 
        model: "M4", 
        description: "Lorem ipsum dsa caef dsadsa dsdsa csa dsad sadsdads dsa ds dadsa.",
        imagesCar: [urlImageCar1, urlImageCar2, urlImageCar3, urlImageCar4, urlImageCar5, urlImageCar6, urlImageCar3, urlImageCar4], 
        performance: {
          hp:680, 
          nm:780, 
          _0_100:4.1, 
          _100_200: 7.3
        },
        likes:2,
        history:[  
          {date: "23 12 2009", photosUrl:["urlImageCar"], name:"Stock", description:'510hp 600Nm'},
          {date: "23 12 2009", photosUrl:["urlImageCar"], name:"Stage 1", description:'570hp 710Nm'},
          {date: "13 12 2013", photosUrl:["urlImageCar"], name:"Stage 2", description:'640hp 780Nm'}
        ]
      }
    }
  ]