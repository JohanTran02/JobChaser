import { MouseEventHandler, useContext } from "react";
import { Outlet, Link } from "react-router-dom"
import { auth, signOut } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export function NavBar({ changeTheme }: { changeTheme: MouseEventHandler }) {
    const user = useContext(AuthContext)
    const theme = useContext(ThemeContext);
    console.log(user);

    return (
        <>
            <header className={`flex ${theme}`}>
                <nav className="flex-1">
                    <ul className="flex flex-row">
                        <li><Link to="/JobChaser/">Home</Link></li>
                        <li><Link to="/JobChaser/Jobs">Jobs</Link></li>

                        {user ?
                            <li>
                                <Link to="/JobChaser/" onClick={() => signOut(auth)}>Sign Out</Link>
                            </li> :
                            <>
                                <li><Link to="/JobChaser/SignUp">Sign Up</Link></li>
                                <li><Link to="/JobChaser/SignIn">Sign in</Link></li>
                            </>}
                    </ul>
                </nav>
                <button onClick={(e) => changeTheme(e)}>Change theme</button>
                <Outlet />
            </header>
        </>
    )
}

export default NavBar;