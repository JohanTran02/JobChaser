import { addTools, deleteTools, fetchJobsSearches, setInput, setSearchQuery } from "../../slices/jobSlice";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import SuggestedResults from "./SuggestedResults";
import { useDebounce } from "../../Features/debounce";

export default function Menu() {
    const { suggestedModalStatus, searches, input } = useSelector((state: RootState) => state.jobs);
    const filters = [["Sass"], ["React"], ["Vue"]];
    const dispatch = useAppDispatch();
    const debouncedInput = useDebounce(input, 0.4);

    useEffect(() => {
        dispatch(fetchJobsSearches(debouncedInput))
    }, [debouncedInput, dispatch])

    const toolChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? dispatch(addTools(e.target.value)) : dispatch(deleteTools(e.target.value));
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const searchValue = e.target.value;
        dispatch(setInput(searchValue));
    }

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(setSearchQuery(input));
    }

    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ?
        "dark:bg-slate-600 hover:bg-slate-700 dark:placeholder-white" :
        "bg-slate-300 hover:bg-slate-400 placeholder-black";

    return (
        <>
            <div className="w-4/6 pt-10 m-auto relative">
                <form className="flex gap-4" onSubmit={(e) => submit(e)} autoComplete="off">
                    <input
                        type="text"
                        className={`w-full ${theme} rounded-sm p-2 focus:outline-none focus:ring focus:border-blue-500`}
                        value={input}
                        name="inputSearch"
                        onChange={e => search(e)}
                        placeholder="Search a job..."
                    />
                    <input className={`${theme} rounded-sm p-2 cursor-pointer`} type="submit" />
                </form>
                {suggestedModalStatus.includes("open") && searches && <SuggestedResults searches={searches} />}
                <div>
                    {
                        filters.map(([title]) => (
                            <label key={title} className="has-[:checked]:bg-red-500">
                                <input type="checkbox" name="filterRadio" value={title} className="hidden" onChange={toolChecked} />{title}
                            </label>
                        ))
                    }
                </div>
            </div>
        </>
    );
}