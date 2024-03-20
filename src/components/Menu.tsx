export function Menu({ onSearch, input }: { onSearch: React.ChangeEventHandler, input: string }) {
    return (
        <>
            <div className="w-4/6 pt-10 m-auto">
                <input
                    type="search"
                    className="w-full bg-gray-400 placeholder-black rounded-sm p-2"
                    value={input}
                    onChange={e => onSearch(e)}
                    placeholder="Search a job..."
                />
            </div>
        </>
    );
}

export default Menu;