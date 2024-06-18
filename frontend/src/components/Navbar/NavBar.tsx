import { MouseEventHandler, useContext } from "react";
import { Outlet } from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext";
import NavItem from "./NavItem";
import ThemeIcon from "./ThemeIcon";

export default function NavBar({ changeTheme }: { changeTheme: MouseEventHandler }) {
    const theme = useContext(ThemeContext);

    const nav_links = [
        { href: "/JobChaser/", name: "JobChaser" },
        { href: "/JobChaser/Jobs", name: "Jobs" },
        { href: "/JobChaser/SignUp", name: "Sign Up" },
        { href: "/JobChaser/SignIn", name: "Sign In" },
        { href: "/JobChaser/", name: "Sign Out" },
        { href: "/JobChaser/Profile", name: "Profile" },
    ]

    return (
        <>
            <header className={`row-end-1 flex items-end gap-2 p-3 border-b-2 ${theme} sticky top-0 z-10`}>
                <nav className="w-full">
                    <ul className="flex items-end gap-2 text-lg h-full">
                        {nav_links && nav_links.map((nav_link) =>
                            <NavItem key={nav_link.name} name={nav_link.name} href={nav_link.href} />)}
                    </ul>
                </nav>
                <button onClick={(e) => changeTheme(e)} className="w-8"><ThemeIcon /></button>
            </header>
            <Outlet />
        </>
    )
}

