import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import { createUser } from './db';

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (rawUser) => {
            if (!rawUser) {
                setUser(null);
                nookies.set(undefined, 'token', '', {});
            } else {
                const token = await rawUser.getIdToken();
                const formattedUser = formatUser(rawUser);
                createUser(formattedUser.uid, formattedUser);
                setUser(formattedUser);
                nookies.set(undefined, 'token', token, {});
            }
        });
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.za,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
