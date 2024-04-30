import { addTools, deleteTools } from "../slices/jobSlice";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import SuggestedResults from "./SuggestedResults";

export function Menu({ onSubmit, onSearch, input }: { onSubmit: React.FormEventHandler, onSearch: React.ChangeEventHandler, input: string }) {
    const { suggestedModalStatus, searches } = useSelector((state: RootState) => state.jobs);
    const filters = [["Sass"], ["React"], ["Vue"]];
    const dispatch = useAppDispatch();
    const toolChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? dispatch(addTools(e.target.value)) : dispatch(deleteTools(e.target.value));
    }

    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600 hover:bg-slate-700 dark:placeholder-white" : "bg-slate-300 hover:bg-slate-400 placeholder-black";

    return (
        <>
            <div className="w-4/6 pt-10 m-auto relative">
                <form className="flex gap-4" onSubmit={(e) => onSubmit(e)} autoComplete="off">
                    <input
                        type="text"
                        className={`w-full ${theme} rounded-sm p-2 focus:outline-none focus:ring focus:border-blue-500`}
                        value={input}
                        name="inputSearch"
                        onChange={e => onSearch(e)}
                        placeholder="Search a job..."
                    />
                    <input className={`${theme} rounded-sm p-2 cursor-pointer`} type="submit" />
                </form>
                {suggestedModalStatus.includes("open") && searches && <SuggestedResults searches={searches} />}
                <div>
                    {
                        filters.map(([title]) => (
                            <label key={title} className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={title} className="hidden" onChange={toolChecked} />{title}</label>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Menu;