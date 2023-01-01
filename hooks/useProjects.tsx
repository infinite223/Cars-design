import { collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { User } from "../utils/types";
import { db } from "./useAuth";

export const useProjects = (user:User, limit:number) => {
    const [projects, setProjects] = useState<any[] | null>(null)

    const [loading, setLoading] = useState(false)
    const projectsRef = collectionGroup(db, 'projects')
    const getProjects = () => {
        onSnapshot(projectsRef, (snapchot) => {      
            setProjects(snapchot.docs.map((doc, i)=> {
                return doc.data()
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