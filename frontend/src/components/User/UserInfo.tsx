import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useCookies } from "react-cookie";

export default function UserInfo() {
    const [cookies] = useCookies(["user"]);
    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";

    return (
        <>
            <div className={`${theme} lg:mx-32 rounded-md`}>
                {cookies.user.name ? cookies.user.name : `Användare ${cookies.user.id}`}
                <p>{`Sparade Jobb: ${cookies.user.jobs.length}`}</p>
            </div>
        </>
    )
}