export const deleteProject = (setShowAlert: (value: {show:boolean, message:string, type:string}) => void, projectId?:string) => {
    setShowAlert({show:true, message:projectId?projectId:'Error', type:'SUCCESS'})
    console.log('xdd')
}