import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from 'expo-google-app-auth'

const AuthContext = createContext({})

const config = {
  androidClientId:"612500373363-fg8u6laps96pr5qtaqa1jf0hj3hjib15.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({children}) => {

  const signInWithGoogle = async () => {
    Google.logInAsync(config).then(async (loginResult)=> {
      if(loginResult==="success"){

      }
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