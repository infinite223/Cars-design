export type User = {
    name:string,
    description?:string,
    email:string
    imageUri:string,
    carProjects?:CarprojectData[],
    place?:Place,
    uid:string,
    stats?: {
        followers: number,
        views: number,
        following:number
    }
}
// const engine = require('../assets/componentsIcons/engine.png')

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
    likes:number,
    history:HistoryCar[]
}

export type CarprojectData = {
    id:string,
    author:User,
    createdAt:string,
    car:Car
}

export type MeetingRoom = {
    name: string,
    createdBy: User,
    place: Place,
    people: Array<{
        name:string,
        place?:Place,
        carProjects:CarprojectData,
        imageUri:string,
        uid:string
    }>,
    image: string,
    date: string
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