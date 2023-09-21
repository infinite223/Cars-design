import { onSnapshot, query,getDocs, orderBy, collection, where, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { setChats } from "../slices/chatsSlice";
import { db } from "./useAuth";
// import { setReadIncrement } from "../reducers/readCount";
import * as Notifications from 'expo-notifications';

export const useChats = (user:any,  dispatch:any, readCounts:number) => {
    const [loadingChats, setLoadingChats] = useState<boolean>(false)

    useEffect(()=> {
      if(user && user.uid ){
        setLoadingChats(true) 
        const chatsRef = collection(db, "chats")
        const usersRef = collection(db, "users")
        
        const chatsQuery = query(chatsRef, where("persons", "array-contains", user.uid),  orderBy('lastMessage.time', 'desc'))
        
        const unsubscribe = onSnapshot(chatsQuery, async (snapchot) => {  
          let chatsData = snapchot.docs.map((doc, i)=> {
            return doc.data()
          })
          

          const usersUidOnChats = chatsData.map((chat) => {
            return chat.persons.filter((uid:string) => uid !== user.uid)[0]
          })

          const usersQuery = query(usersRef, where("uid", "in", usersUidOnChats))

          const getUsersData = await getDocs(usersQuery)

          if(getUsersData){
            const _chatsData:any[] = chatsData
            
            dispatch(setChats(getUsersData.docs.map((doc, i) => {
             return {
              data:{
                from:{id: doc.data().uid, name:doc.data().name, imageUri:doc.data().imageUri},
                to:{id: user.uid, name:user.name, imageUri:user.imageUri}
              },
              lastMessage: _chatsData[i].lastMessage,
              persons:_chatsData[i].persons,
              id:_chatsData[i].id,
              block:_chatsData[i].block
             }
            })))  

            let nowTime = new Date();
            nowTime.setMinutes(nowTime.getMinutes() - 2);

            if(_chatsData[0].lastMessage.time.toDate() > nowTime){
              const userDataLastMessage:any = getUsersData.docs.find((doc) => doc.data().uid ===_chatsData[0].lastMessage.fromUid)
              schedulePushNotification(_chatsData[0].lastMessage.message, userDataLastMessage.data().name)
            }
          }
        })
      
        setLoadingChats(false) 

        return () => {
          if(user) unsubscribe();
        };
      }
    }, [user])

    useEffect(() => {

    }, [])

    return { loadingChats }
}
async function schedulePushNotification(message:string, namePerson: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: namePerson+` napisał/a do Ciebie`,
      body: message,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
