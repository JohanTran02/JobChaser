import { Outlet, Link } from "react-router-dom"

export function NavBar() {
    return (
        <>
            <nav className="flex">
                <ul>
                    <li><Link to="/JobChaser/">Home</Link></li>
                    <li><Link to="/JobChaser/Jobs">Jobs</Link></li>
                    <li><Link to="/JobChaser/SignUp">Sign Up</Link></li>
                    <li><Link to="/JobChaser/SignIn">Sign in</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar;