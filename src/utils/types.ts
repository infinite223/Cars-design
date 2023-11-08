import { FieldValue, Timestamp } from "firebase/firestore"

export type User = {
    name:string,
    description?:string,
    email:string
    imageUri:string | null,
    projectsId?:string[],
    place?:Place,
    savedProblems?: string[],
    uid:string,
    stats: {
        followers:string[],
        views: string[],
        following:string[],
    },
    hideProjects: [],
    premium?:boolean,
    typeAccount: 'Person' | 'Company',
    likesProjects?:string[]
}   

export type UserList = {
    name:string,
    imageUri: string,
    uid:string
}

export type Message = {
    email: string,
    imageUri: string,
    message:string,
    name:string,
    timestamp: any
}

export type Chat = {
    data: {
        from: {id: string, name: string, imageUri:string}
        to: {id: string, name: string, imageUri:string}
    }
    lastMessage: {message:string, fromUid: string, time: Timestamp, view:boolean},
    new?:boolean,
    persons: string[]
    id:string,
    block?:boolean
}

/// startedAT search...

export type ProblemsCategory = 
    'Engine' | 'Transmission'| 'Turbo'| 'fuel'| 'oil'| 'Cooler'| 'suspension' | 'driver' | 'other'


export const ProblemsCategoryData:{name: string, icon:string, type: ProblemsCategory}[] = [
    {name: 'Silnik', icon: '', type:'Engine'},
    {name: 'Sterownik', icon: '', type:'driver'},
    {name: 'Skrzynia biegów', icon: '', type:'Transmission'},
    {name: 'Turbo', icon:'', type: 'Turbo'},
    {name: 'paliwo', icon: '', type: 'fuel'},
    {name: 'olej silnikowy', icon: '',type: 'oil'},
    {name: 'Chłodnice', icon: '', type: 'Cooler'},
    {name: 'zawieszenie', icon: '', type: 'suspension'},
    {name: 'inna', icon: '', type: 'other'}
]

export type SuggestResolvedType = {
    id:string,
    text: string, 
    comments: {text:string, author:UserList, createdAt: Timestamp}[],
    likes:string[],
    solution:boolean,
    author:UserList
}

export type GeneralProblemType = {
    id:string
    author: UserList,
    title:string,
    type:'General' | 'Specyfic',
    description: string,
    imageUri:string[],
    status: 'resolved' | 'Unresolved',
    date:Timestamp | any,
    solvedText?:string,
    // suggestResolved:SuggestResolvedType[]
}

export type SpecyficProblemType = {
    id:string
    author: UserList,
    category:ProblemsCategory,
    errorCodes:string[],
    title:string,
    type:'General' | 'Specyfic',
    description: string,
    imageUri:string[],
    status: 'resolved' | 'Unresolved',
    date:Timestamp | any,
    solvedText?:string,
    // suggestResolved:SuggestResolvedType[]
}




export type Component = {
    type: string,
    name: string,
    icon: string,
    description?: string
}

export type Place = {
    city: string | null
    latitude: number | null,
    longitude: number | null
}

export type Image = {
    url: string,
    place?:Place,
    likes?:number
}

export type HistoryCar = {
    date:FieldValue | Timestamp, 
    photosUrl?:string | any, 
    name:string, 
    description?:string,
    company?:string,
    performance:Performance,
    components?: Component[]
}

export type HistoryCarCreated = {
    date:FieldValue, 
    photosUrl?:any, 
    name:string, 
    description?:string,
    company?:string,
    performance:Performance,
    components?: Component[]
}

export type Car = {
    CarMake:string,
    model:string,
    description:string,
    mainDataCarType:MainDataCarType,
    imagesCar:Image[] | any,
    mainImage?: string,
    components: Component[],
    likes:string[],
    likesCount:number,
    history:HistoryCar[],
    soundCheck:string | any,
    links: {ig:string, yt:string, fb:string}
}

export type CarCreated = {
    CarMake:string,
    model:string,
    description:string,
    mainDataCarType:MainDataCarType,
    imagesCar:Image[],
    components: Component[],
    likes:string[],
    likesCount:number,
    history:HistoryCarCreated[],
    soundCheck:string | any,
    links: {ig:string, yt:string, fb:string}
}


export type CarprojectData = {
    id:string,
    author:UserList,
    createdAt:any,
    car:Car,
    place?:Place
}

export type CarprojectDataCreated = {
    id:string,
    author:UserList,
    createdAt:Timestamp | FieldValue,
    car:CarCreated,
    place?:Place
}

export type MicroCarprojectData = {
  carMake:string, model:string, imageUri:string
}

export type UserInMeeting = {
    name:string,
    place?:Place,
    carProject?:MicroCarprojectData,
    imageUri:string,
    uid:string
}

export type MeetingRoom = {
    name: string,
    description?:string,
    createdBy: UserList,
    authorProject?:MicroCarprojectData | null,
    place: Place,
    people: Array<UserInMeeting>,
    date: any,
    id:string,
}

export type Performance = [
    {type:string, value:number},
    {type:string, value:number},
    {type:string, value:number},
    {type:string, value:number}
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

export type MainDataCarinfo = {

}

export type MicroCar = {
    image:string,
    carMake: string,
    model:string,
    likes:number,
    stage:string,
    performance: {
        hp: number,
        nm:number
    },
    name:string
}

export type MainDataCarType = {
    engine: {
        name: string,
        volume: number,
        cylinderType: string, 
        fuel: string
    },
    transmission: {
        name: string,
        countGear: number,
    },
    driveType: string
}
export const driveTypes = ['RWD' , "FWD" , 'AWD']
export const fuels = [ 'Benzyna 100' ,'Benzyna 98', 'Benzyna 95' , 'Diesel' , 'Gaz' , 'Inne']

export const cylindersType = [
    "R2",
    "R3",
    "R4",
    "R5",
    "VR5",
    "R6",
    "VR6",
    "V6",
    "V8",
    "V10",
    "V12",
    "W8",
    "W12",
    "W16"
  ];