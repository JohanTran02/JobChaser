import { Link } from "react-router-dom";

export default function NavItem({ href, name }: { href: string, name: string }) {
    let navItem;

    if (name === "JobChaser") navItem = <Link to={href} className="text-2xl font-bold">{name}</Link>;
    else navItem = <Link to={href}>{name}</Link>

    return (
        <>
            <li>
                {navItem}
            </li>
        </>
    )
}