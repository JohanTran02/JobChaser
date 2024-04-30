import { useContext } from "react";
import { JobSuggestions } from "../job.d";
import { ThemeContext } from "../context/ThemeContext";

export default function AutoComplete({ search }: { search: JobSuggestions }) {
    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "hover:bg-slate-700" : "hover:bg-slate-400";

    return (
        <>
            <li className={`${theme}`}>{search.found_phrase}</li>
        </>
    )
}