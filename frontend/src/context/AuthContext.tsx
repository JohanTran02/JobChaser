import { createContext } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

export const AuthContext = createContext("")
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies,] = useCookies(["token"]);

    return (
        <>
            <CookiesProvider>
                <AuthContext.Provider value={cookies.token}>
                    {children}
                </AuthContext.Provider>
            </CookiesProvider>
        </>
    )
} 