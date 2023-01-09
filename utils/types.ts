import { FieldValue, Timestamp } from "firebase/firestore"

export type User = {
    name:string,
    description?:string,
    email:string
    imageUri:string | null,
    projectsId?:string[],
    place?:Place,
    uid:string,
    stats: {
        followers:string[],
        views: string[],
        following:string[],
    },
    hideProjects: []
}   

export type UserList = {
    name:string,
    imageUri: string,
    uid:string
}

export type Component = {
    type: string,
    name: string,
    icon: string,
    description?: string
}

export type Place = {
    city: string
    latitude: number,
    longitude: number
}

export type Image = {
    url: string,
    place?:Place,
    likes?:number
}

export type HistoryCar = {
    date?:string, 
    photosUrl?:string, 
    name?:string, 
    description?:string,
    company?:string,
    performance?:Performance,
    components?: Component[]
}

export type Car = {
    CarMake:string,
    model:string,
    description:string,
    performance?:Performance,
    imagesCar:Image[],
    likes:string[],
    history:HistoryCar[],
    soundCheck:string,
    links: {ig:string, yt:string, fb:string}
}

export type CarprojectData = {
    id:string,
    author:UserList,
    createdAt:Timestamp,
    car:Car,
    place?:Place
}

export type MicroCarprojectData = {
  carMake:string, model:string, imageUri:string
}

export type MeetingRoom = {
    name: string,
    createdBy: UserList,
    authorProject?:MicroCarprojectData,
    place: Place,
    people: Array<{
        name:string,
        place?:Place,
        carProject?:MicroCarprojectData,
        imageUri:string,
        uid:string
    }>,
    date: Date
    id:string,
}

export type Performance = [
    {type:string, value:number},
    {type:string, value:number},
    {type:string, value:number}?,
    {type:string, value:number}?
]

export type Error = {
    show:boolean,
    message:string
}

export type AlertProps = {
    type:string, 
    show:boolean, 
    message:string
}