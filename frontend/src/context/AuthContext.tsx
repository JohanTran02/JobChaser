import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<User | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated, setAuthenticated] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setAuthenticated(auth.currentUser);
            } else {
                console.log("logged out");
                setAuthenticated(auth.currentUser);
            }
        });
    }, [])
    console.log(isAuthenticated);


    return (
        <>
            <AuthContext.Provider value={isAuthenticated}>
                {children}
            </AuthContext.Provider>
        </>
    )
} 