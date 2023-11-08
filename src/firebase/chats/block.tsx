import { doc, updateDoc, addDoc, collection, setDoc,  } from "firebase/firestore"
import { db } from "../../hooks/useAuth"

export const blockPerson = async (chatId:string) => {
    const chatsRef = doc(db, 'chats', chatId)

    updateDoc(chatsRef, {
        'block':true
    })
}

export const unBlockPerson = (chatId:string) => {
    const chatsRef = doc(db, 'chats', chatId)

    updateDoc(chatsRef, {
        'block':false
    })
}