import { MouseEventHandler, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext";
import NavItem from "./NavItem";
import ThemeIcon from "./ThemeIcon";
import { useCookies } from "react-cookie";
import { options } from "../../job.d";

export default function NavBar({ changeTheme }: { changeTheme: MouseEventHandler }) {
    const [cookies, , removeCookie] = useCookies(["token"]);
    const theme = useContext(ThemeContext);
    const location = useLocation();
    console.log(location.pathname);

    const nav_links = [
        { href: "/JobChaser/", name: "JobChaser" },
        { href: "/JobChaser/Jobs", name: "Jobs" },
        { href: "/JobChaser/SignUp", name: "Sign Up" },
    ]

    return (
        <>
            <header className={`row-end-1 flex items-end gap-2 p-3 border-b-2 ${theme} sticky top-0 z-10`}>
                <nav className="mr-auto">
                    <ul className="flex items-end gap-2 text-lg h-full">
                        {nav_links && nav_links.map((nav_link) =>
                            <NavItem key={nav_link.name} name={nav_link.name} href={nav_link.href} />)}
                        {cookies.token ?
                            <li onClick={() => removeCookie("token", options)}>
                                <Link to="/JobChaser/">Sign Out</Link>
                            </li> :
                            <li>
                                <Link to="/JobChaser/SignIn">Sign in</Link>
                            </li>
                        }
                    </ul>
                </nav>
                <button onClick={(e) => changeTheme(e)} className="w-8"><ThemeIcon /></button>
            </header>
            <Outlet />
        </>
    )
}

