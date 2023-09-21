import { onSnapshot, query,getDocs, orderBy, collection, where, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { setChats } from "../slices/chatsSlice";
import { db } from "./useAuth";
// import { setReadIncrement } from "../reducers/readCount";
import * as Notifications from 'expo-notifications';
import { useRoute } from "@react-navigation/native";

export const useChats = (user:any,  dispatch:any, readCounts:number, activeChat:string) => {
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
          console.log(usersUidOnChats, "chats")

          if(getUsersData){ 
            const _chatsData:any[] = chatsData
              // tu jest coś nie tak z I
            dispatch(setChats(getUsersData.docs.map((doc, i) => {
              const findChat = chatsData.find((chat) => chat.persons.find((person:string) => person === doc.data().uid))
              if(findChat){
                return {
                  data:{
                    from:{id: doc.data().uid, name:doc.data().name, imageUri:doc.data().imageUri},
                    to:{id: user.uid, name:user.name, imageUri:user.imageUri}
                  },
                  lastMessage: findChat.lastMessage,
                  persons:findChat.persons,
                  id:findChat.id,
                  block:findChat.block
                 }
              }
   
            })))  

            let nowTime = new Date();
            nowTime.setMinutes(nowTime.getMinutes() - 2);

            if(_chatsData[0].lastMessage.time.toDate() > nowTime){
              const userDataLastMessage:any = getUsersData.docs.find((doc) => doc.data().uid ===_chatsData[0].lastMessage.fromUid)
              const data = {
                data:{
                  from:{id: userDataLastMessage.data().uid, name:userDataLastMessage.data().name, imageUri:userDataLastMessage.data().imageUri},
                  to:{id: user.uid, name:user.name, imageUri:user.imageUri}
                },
                lastMessage: _chatsData[0].lastMessage,
                persons:_chatsData[0].persons,
                id:_chatsData[0].id,
                block:_chatsData[0].block
              }
              if(!data.lastMessage.view){
                schedulePushNotification(_chatsData[0].lastMessage.message, userDataLastMessage.data().name, data)
              }
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
async function schedulePushNotification(message:string, namePerson: string, data:any) {

  await Notifications.scheduleNotificationAsync({
    identifier:data.id,
    content: {
      title: namePerson+` napisał/a do Ciebie`,
      body: message,
      data: { data },
    },
    trigger: { seconds: 2 },
  });

  // const not = await Notifications.getNotificationChannelAsync()
  // if(not){
  //   console.log(not, 'push')
  //  const notFind = (not.find((_not) => _not.content.data.data.id === data.id ))
  //  if(notFind){
  //   Notifications.dismissNotificationAsync(notFind?.identifier)
  //  }
  // }
}
