"use client";
import { auth } from "../services/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const Context = createContext({});

type UserT = {
    user: any,
    isLogin: boolean
    isEmailVerified?: boolean
}

const AuthProvider = ({children}:any) =>{
   
    const [loading, setLoading] = useState<boolean>(true)
    const initialState = {
        user:null,
        isLogin:false
    }
    const [user, setUser] = useState<UserT>(initialState);

    useEffect(()=>{
        const subscribe = auth.onAuthStateChanged((userState)=>{
            setUser({isLogin: userState ? true : false, isEmailVerified: userState?.emailVerified ? true : false, user: userState});
            setLoading(false);
        });
        return subscribe;
    },[])

   

    console.log("User State ",user.user)

    return (
        <Context.Provider value={{user,setUser}}>
            { children}
        </Context.Provider>
    )
}

export const AuthContext = () => useContext(Context);

export default AuthProvider;