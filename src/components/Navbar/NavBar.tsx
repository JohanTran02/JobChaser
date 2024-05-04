import { MouseEventHandler, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"
import { auth, signOut } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import NavItem from "./NavItem";

export default function NavBar({ changeTheme }: { changeTheme: MouseEventHandler }) {
    const user = useContext(AuthContext)
    const theme = useContext(ThemeContext);
    const location = useLocation();
    console.log(location.pathname);

    const nav_links = [
        { href: "/JobChaser/", name: "Home" },
        { href: "/JobChaser/Jobs", name: "Jobs" },
    ]

    return (
        <>
            <header className={`flex ${theme}`}>
                <nav className="flex-1">
                    <ul className="flex flex-row">
                        {nav_links && nav_links.map((nav_link) =>
                            <NavItem name={nav_link.name} href={nav_link.href} />)}
                        {user ?
                            <li>
                                <Link to="/JobChaser/" onClick={() => signOut(auth)}>Sign Out</Link>
                            </li> :
                            <li><Link to="/JobChaser/SignIn">Sign in</Link></li>
                        }
                    </ul>
                </nav>
                <button onClick={(e) => changeTheme(e)}>Change theme</button>
            </header>
            <Outlet />
        </>
    )
}

