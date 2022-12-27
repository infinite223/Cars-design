import { collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { User } from "../utils/types";
import { db } from "./useAuth";

export const useProjects = (user:User) => {
    const [unHideProjects, setUnHideProjects] = useState<any[]>([])
    const [_projects, _setProjects] = useState<any[]>([])

    const [loading, setLoading] = useState(false)
    const projectsRef = collectionGroup(db, 'projects')
    const getProjects = () => {
        console.log('read, projects')
        onSnapshot(projectsRef, (snapchot) => {      
            _setProjects(snapchot.docs.map((doc, i)=> {
                if(user.hideProjects && !user.hideProjects.find((id) => id === doc.data().id)){
                    return doc.data()
                }
            }))      
        })
        setLoading(false)
    } 

    useEffect(()=> {
        setLoading(true)
        if(user.name==="Tester") {
            setUnHideProjects([])
        }
        else {
            getProjects()
            setUnHideProjects(_projects)
        }
    }, [])

    return { unHideProjects, loading }
}