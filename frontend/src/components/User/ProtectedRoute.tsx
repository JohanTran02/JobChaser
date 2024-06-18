import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [cookies] = useCookies(["token"]);

    if (!cookies.token) return <Navigate to="/JobChaser/SignUp" replace />

    return children ? children : <Outlet />
}