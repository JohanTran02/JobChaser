import { useDispatch } from "react-redux";
import { addTools, deleteTools } from "../slices/jobSlice";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Menu({ onSubmit, onSearch, input }: { onSubmit: React.FormEventHandler, onSearch: React.ChangeEventHandler, input: string }) {
    const dispatch = useDispatch();
    const toolChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? dispatch(addTools(e.target.value)) : dispatch(deleteTools(e.target.value));
    }

    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600 dark:placeholder-white" : "bg-slate-300 placeholder-black";

    return (
        <>
            <div className="w-4/6 pt-10 m-auto">
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="text"
                        className={`w-full ${theme} rounded-sm p-2`}
                        value={input}
                        name="inputSearch"
                        onChange={e => onSearch(e)}
                        placeholder="Search a job..."
                    />
                    <input type="submit" />
                </form>
            </div>
            <div>
                <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"Sass"} className="hidden" onChange={toolChecked} />Sass</label>
                <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"React"} className="hidden" onChange={toolChecked} />React</label>
                <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"Vue"} className="hidden" onChange={toolChecked} />Vue</label>
            </div>
        </>
    );
}

export default Menu;