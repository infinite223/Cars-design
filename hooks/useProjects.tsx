import { collectionGroup, onSnapshot, query, where, limit, startAfter, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { User } from "../utils/types";
import { db } from "./useAuth";

export const useProjects = (user:User, _limit:number) => {
    const [projects, setProjects] = useState<any[] | null>(null)

    const [loading, setLoading] = useState(false)
    const projectsRef = collectionGroup(db, 'projects')
    const projectsQuery = query(projectsRef, limit(2))
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
            const next = query(projectsRef, startAfter(lastVisible), limit(2))
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
        if(user.name==="Tester") {
            setProjects([])
        }
        else {
            getProjects()
        }
    }, [])

    return { projects, loading, nextProjects }
}