import { createContext } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

export const AuthContext = createContext({})
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies,] = useCookies(["token", "user"]);

    return (
        <>
            <CookiesProvider>
                <AuthContext.Provider value={{ token: cookies.token, user: cookies.user }}>
                    {children}
                </AuthContext.Provider>
            </CookiesProvider>
        </>
    )
} 