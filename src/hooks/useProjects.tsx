import { collectionGroup, onSnapshot, query, limit, startAfter, getDocs, orderBy, QuerySnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { User } from "../utils/types";
import { db } from "./useAuth";

export const useProjects = (user:User, _limit:number) => {
    const [projects, setProjects] = useState<any[] | null>(null)
    const [_projects, _setProjects] = useState<any[]>([])

    const [loading, setLoading] = useState(false)
    const projectsRef = collectionGroup(db, 'projects')
    const projectsQuery = query(projectsRef,  limit(2), orderBy('createdAt', 'desc'),)
    const [lastVisible, setLastVisible] = useState<any>(null)

    const getProjects = async () => {
        onSnapshot(projectsQuery, (snapchot) => {      
            setProjects(snapchot.docs.map((doc, i)=> {
                return doc.data()
            }))   
        })

        const documentSnapshots = await getDocs(projectsQuery);
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length-1])
        setLoading(false)
    } 

    const nextProjects = async () => {
        if(projects?.length){
            const next = query(projectsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(2))

            onSnapshot(next, async (snapchot) => {   
                if(snapchot.docs[0]){
                    setLoading(true)
                    const nextProjects = snapchot.docs.map((doc, i)=> {
                        return doc.data()
                    })
                    setProjects(projects.concat(nextProjects))
                    const documentSnapshots = await getDocs(next);
                    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length-1])
                    setLoading(false)
                }    
            })
      
        }
    }

    useEffect(()=> {
        setLoading(true)
            getProjects()
    }, [])

    return { projects, loading, nextProjects }
}