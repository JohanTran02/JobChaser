import { CookiesProvider } from "react-cookie";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <CookiesProvider>
                {children}
            </CookiesProvider>
        </>
    )
} 