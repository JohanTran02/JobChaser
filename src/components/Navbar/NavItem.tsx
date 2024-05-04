import { Link } from "react-router-dom";

export default function NavItem({ href, name }: { href: string, name: string }) {
    return (
        <>
            <li><Link to={href}>{name}</Link></li>
        </>
    )
}