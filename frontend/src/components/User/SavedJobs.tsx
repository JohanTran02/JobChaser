
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThemeContext } from "../../context/ThemeContext";
import SavedJobCard from "./SavedJobCard";
import { useDebounceJob } from "../../Features/debounce";

export default function SavedJobs() {
    const { savedJobModalStatus, savedJobs, savedCurrentJob } = useSelector((state: RootState) => state.jobs)
    const debouncedJob = useDebounceJob(savedCurrentJob, savedJobModalStatus, 1);

    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";
    return (
        <>
            <section className="flex gap-4 lg:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden'>
                    {savedJobs && savedJobs.map((savedJob) => (<SavedJobCard key={savedJob.id} job={savedJob} />))}
                </ul>
                {savedJobModalStatus.includes("open") &&
                    <section className={`${theme} flex flex-col flex-1 sticky top-20 p-3 mt-10 rounded-md h-[80dvh] divide-y divide-slate-800/20 `}>
                        {debouncedJob}
                    </section>
                }
            </section>
        </>
    )
}