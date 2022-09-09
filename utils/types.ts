export type User = {
    name:string,
    email:string
    imageUri:string,
    carProjects?:CarprojectData[]
}

export type Car = {
    CarMake:string,
    model:string,
    description:string,
    hp:number,
    nm:number,
    performance?:number[],
    imagesCar:string[],
    likes:number,
    history:Array<{date?:string, photosUrl?:string[], name?:string, description?:string}>
}

export type CarprojectData = {
    id:string,
    author:User,
    createdAt:string,
    car:Car
}