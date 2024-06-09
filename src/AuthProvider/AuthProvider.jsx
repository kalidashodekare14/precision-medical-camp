import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile, updateEmail } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const authContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const provider = new GoogleAuthProvider();

    const signUpSystem = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginSystem = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateSystem = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    const logOutSystem = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleLoginSystem = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })
            }
            else {
                // Do something
                localStorage.removeItem('access-token');
                setLoading(false)
            }



        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic, user])

    const infoLogged = { user, loading, signUpSystem, loginSystem, userUpdateSystem, logOutSystem, googleLoginSystem }

    return (
        <authContext.Provider value={infoLogged}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;