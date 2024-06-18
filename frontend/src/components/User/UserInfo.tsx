import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function UserInfo() {
    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";
    return (
        <>
            <div className={`${theme} lg:mx-32 rounded-md`}>
                test
            </div>
        </>
    )
}