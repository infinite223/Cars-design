import { collectionGroup, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { User } from "../utils/types";
import { db } from "./useAuth";

export const useProjects = (user:User) => {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const projectsRef = collectionGroup(db, 'projects')

    const getProjects = () => {
        console.log('read, projects')
        onSnapshot(projectsRef, (snapchot) => {      
            setProjects(snapchot.docs.map((doc, i)=> {
                return {id: doc.id, car:doc.data(), author:user, createdAt:'22.11.2022'}
            }))      
        })
        setLoading(false)
    } 

    useEffect(()=> {
        setLoading(true)
        if(user.name==="Tester") {
            setProjects([])
        }
        else {
            getProjects()
        }
    }, [])

    return { projects, loading }
}