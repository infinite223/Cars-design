import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
//import  {logInAsync} from 'expo-google-app-auth'
import {logInAsync} from 'expo-auth-session'
import { getAuth } from 'firebase/auth'
// import { auth } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHF3Pn_imNrB-MRAO6kQtsSLCB__12k-o",
  authDomain: "cars-projects-317ef.firebaseapp.com",
  projectId: "cars-projects-317ef",
  storageBucket: "cars-projects-317ef.appspot.com",
  messagingSenderId: "612500373363",
  appId: "1:612500373363:web:661b979a1e555b4b854f06"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()


const AuthContext = createContext({})

const config = {
  androidClientId:'612500373363-gdoqv1buqbnbl568spahf84fblu7gj39.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({children}) => {
  const signInWithGoogle = async () => {
    console.log("xd")
    await logInAsync(config).then(async (loginResult)=> {
      // console.log(loginResult, "xd")
      if(loginResult.type==="success"){
        const { idToken, accessToken } = loginResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
         console.log(loginResult, "xd")
        await signInWithCredential(auth, credential).then((e)=>console.log(e)).catch((a)=> console.log(a))
      }

      return Promise.reject();
    })
  }

  return (
    <AuthContext.Provider value={{
        user:null,
        signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}
export default function useAuth() {
    return useContext(AuthContext)
}   