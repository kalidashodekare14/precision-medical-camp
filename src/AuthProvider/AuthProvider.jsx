import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';

export const authContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])

    const signUpSystem = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginSystem = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateSystem = (name, photoURL) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    const logOutSystem = () =>{
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const infoLogged = { user, signUpSystem, loginSystem, userUpdateSystem, logOutSystem }

    return (
        <authContext.Provider value={infoLogged}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;