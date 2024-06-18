import { Link } from "react-router-dom";
import { options } from "../../job.d";
import { useCookies } from "react-cookie";


export default function NavItem({ href, name }: { href: string, name: string }) {
    const [cookies, , removeCookie] = useCookies(["token"]);
    let navItem;

    if (name === "JobChaser") navItem = <Link to={href} className="text-2xl font-bold">{name}</Link>;
    else if (name === "Sign Out") navItem = <Link to={href} onClick={() => removeCookie("token", options)}>{name}</Link>;
    else navItem = <Link to={href}>{name}</Link>

    if (!cookies.token && name === "Sign Out" || !cookies.token && name === "Profile"
        || cookies.token && name === "Sign Up" || cookies.token && name === "Sign In") return;

    return <li className={`${name === "Jobs" ? "mr-auto" : ""}`}>{navItem}</li>
}