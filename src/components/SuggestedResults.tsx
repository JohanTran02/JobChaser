import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";
import { JobSuggestions } from "../job.d";
import AutoComplete from "./Autocomplete";
import { useAppDispatch } from "../redux/store";
import { setSearchQuery } from "../slices/jobSlice";


export default function SuggestedResults({ searches }: { searches: JobSuggestions[] }) {
    const dispatch = useAppDispatch();
    function getSuggestedResult(e: React.MouseEvent<HTMLUListElement>) {
        const autocompleteQuery = ((e.target as HTMLLIElement).textContent) as string;
        dispatch(setSearchQuery(autocompleteQuery));
    }

    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600 dark:placeholder-white" : "bg-slate-300 placeholder-black";

    return (
        <>
            <ul className={`${theme} rounded-sm absolute z-10 divide-y divide-slate-800/20 w-full cursor-pointer`}
                onClick={(e) => getSuggestedResult(e)}>
                {
                    searches && searches.map((search: JobSuggestions, index) => <AutoComplete key={index} search={search} />)
                }
            </ul >
        </>
    )
}