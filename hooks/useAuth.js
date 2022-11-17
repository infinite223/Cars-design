import { View, Text } from 'react-native'
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

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
const auth = getAuth(app)
const AuthContext = createContext({})

const config = {
  androidClientId:'612500373363-gdoqv1buqbnbl568spahf84fblu7gj39.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => 
    onAuthStateChanged(auth, (user) => {
      if(user){
        // get user data from firebase 
        setUser(user )
      }
      else {
        setUser(null)
      }
      setLoadingInitial(false)
    }
  ), [signInWithGoogle])

  const signInAsTester = () => {
    setUser({name: "Tester"})
  }

  const [request, response, signInWithGoogle] = Google.useIdTokenAuthRequest(
    {
       clientId: '612500373363-fg8u6laps96pr5qtaqa1jf0hj3hjib15.apps.googleusercontent.com'
    },
  );

  useEffect(async () => {
    const signFunction = async () => {
      setLoading(true)
      if (response?.type === 'success') {
        const { id_token, accessToken } = response.params;
        console.log("response")
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential).then((e)=>console.log(e)).catch((a)=> console.log(a))
        .finally(()=>setLoading(false))
      }
    }
    signFunction()
  }, [response]);

    const logout = () => {
      setLoading(true)
      // if(user.uid){
      //   signOut(auth).catch((err)=>setError(err)).finally(()=>setLoading(false))
      //   const { id_token, accessToken, oauthIdToken } = response.params;
      //   AuthSession.revokeAsync({token: id_token, clientId: '612500373363-fg8u6laps96pr5qtaqa1jf0hj3hjib15.apps.googleusercontent.com'}, Google.discovery)
      //   .then(()=>console.log("xd")).catch((e)=>console.log(e))
      // }
      // else {
        setUser(null)
      // }
    }
  
    const memoedValue = useMemo(() => ({
      user,
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