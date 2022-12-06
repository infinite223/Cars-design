export type User = {
    name:string,
    description?:string,
    email:string
    imageUri:string,
    projectsId?:string[],
    place?:Place,
    uid:string,
    stats?: {
        followers: {uid:string, name: string, imageUrl:string},
        views:  {uid:string, name: string, imageUrl:string},
        following: {uid:string, name: string, imageUrl:string},
    }
}

export type UserList = {
    name:string,
    imageUri: string,
    uid:string
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
    authorUid:string,
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

export type AlertProps = {
    type:string, 
    show:boolean, 
    message:string
}