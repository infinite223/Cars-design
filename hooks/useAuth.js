import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { envGoogle } from './../utils/env';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getStorage } from 'firebase/storage';


WebBrowser.maybeCompleteAuthSession();

const firebaseConfig = {
  apiKey: "AIzaSyDHF3Pn_imNrB-MRAO6kQtsSLCB__12k-o",
  authDomain: "cars-projects-317ef.firebaseapp.com",
  projectId: "cars-projects-317ef",
  storageBucket: "cars-projects-317ef.appspot.com",
  messagingSenderId: "612500373363",
  appId: "1:612500373363:web:661b979a1e555b4b854f06"
}; 

export let app = initializeApp(firebaseConfig);
export const storage = getStorage()
const auth = getAuth(app)
const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
  const db =  getFirestore()
  const [user, setUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigation = useNavigation()

  useEffect(() => 
    onAuthStateChanged(auth, async (user) => {

      if(user){
        const getUserData = async () => {
          console.log(user, 'uuu')
          const usersRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(usersRef);
          if (docSnap.data()?.name) {
            setUser(docSnap.data())
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setUser({
              name:user.displayName,
              email:user.email,
              image:user.photoURL,
              uid:user.uid
             })
            navigation.navigate('EditProfile')
          }
        }
        getUserData()
      }
      else {
        setUser(null)
      }
      setLoadingInitial(false)
    }
  ), [signInWithGoogle])

  const signInAsTester = () => {
   signInWithEmailAndPassword(auth, 'test@gmail.com', 'test123')
   .catch((e) => console.log(e))
  }

  const [request, response, signInWithGoogle] = Google.useIdTokenAuthRequest(
    {
       clientId: envGoogle.authKey
    },
  );

  const signFunction = async () => {
    setLoading(true)
    if (response?.type === 'success') {
      const { id_token, accessToken } = response.params;
      console.log("response")
      const credential = GoogleAuthProvider.credential(id_token, accessToken);
      await signInWithCredential(auth, credential)
        .then((e)=>console.log(e.user))
        .catch((a)=> console.log(a))
        .finally(()=>setLoading(false))
    }
  }

  useEffect(() => {
    signFunction()
  }, [response]);

    const logout = () => {
      setLoading(true)
      if(user.uid){
        signOut(auth).catch((err)=>setError(err)).finally(()=>setLoading(false))
        const { id_token, accessToken, oauthIdToken } = response.params;
        AuthSession.revokeAsync({token: id_token, clientId: envGoogle.authKey}, Google.discovery)
        .then(()=>console.log("xd")).catch((e)=>console.log(e))
      }
      else {
        setUser(null)
      }
    }
  
    const memoedValue = useMemo(() => ({
      user,
      setUser,
      loading,
      error,
      signInWithGoogle,
      signInAsTester,
      logout
    }), [user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider> 
  )
}
export default function useAuth() {
    return useContext(AuthContext)
}   

export const db = getFirestore(app)