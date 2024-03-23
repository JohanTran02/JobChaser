import { MouseEventHandler } from "react";
import { Outlet, Link } from "react-router-dom"

export function NavBar({ changeTheme }: { changeTheme: MouseEventHandler }) {
    return (
        <>
            <header className="flex">
                <nav className="flex-1">
                    <ul className="flex flex-row">
                        <li><Link to="/JobChaser/">Home</Link></li>
                        <li><Link to="/JobChaser/Jobs">Jobs</Link></li>
                        <li><Link to="/JobChaser/SignUp">Sign Up</Link></li>
                        <li><Link to="/JobChaser/SignIn">Sign in</Link></li>
                    </ul>
                </nav>
                <button onClick={(e) => changeTheme(e)}>Change theme</button>
                <Outlet />
            </header>
        </>
    )
}

export default NavBar;