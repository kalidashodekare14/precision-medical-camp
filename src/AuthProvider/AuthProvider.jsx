import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';

export const authContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, seLoading] = useState(true)

    const signUpSystem = (email, password) => {
        seLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginSystem = (email, password) => {
        seLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateSystem = (name, photoURL) =>{
        seLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    const logOutSystem = () =>{
        seLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            seLoading(false)
            console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const infoLogged = { user, loading, signUpSystem, loginSystem, userUpdateSystem, logOutSystem }

    return (
        <authContext.Provider value={infoLogged}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;