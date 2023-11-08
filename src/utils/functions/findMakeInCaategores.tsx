export const findMakeInCategores = (number:number, makesCategory:{key:number, value:string}[]) => {
    let find = makesCategory.find((make)=>make.key===number)?.value
    if(typeof find === 'undefined'){
        find = ''
    }
    return find
}