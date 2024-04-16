import { useDispatch } from "react-redux";
import { addTools, deleteTools } from "../slices/jobSlice";

export function Menu({ onSearch, input }: { onSearch: React.ChangeEventHandler, input: string }) {

    const dispatch = useDispatch();
    const toolChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? dispatch(addTools(e.target.value)) : dispatch(deleteTools(e.target.value));
    }

    return (
        <>
            <div>
                <div className="w-4/6 pt-10 m-auto">
                    <input
                        type="search"
                        className="w-full bg-gray-400 placeholder-black rounded-sm p-2"
                        value={input}
                        onChange={e => onSearch(e)}
                        placeholder="Search a job..."
                    />
                </div>
                <div>
                    <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"Sass"} className="hidden" onChange={toolChecked} />Sass</label>
                    <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"React"} className="hidden" onChange={toolChecked} />React</label>
                    <label className="has-[:checked]:bg-red-500"><input type="checkbox" name="filterRadio" value={"Vue"} className="hidden" onChange={toolChecked} />Vue</label>
                </div>
            </div>
        </>
    );
}

export default Menu;