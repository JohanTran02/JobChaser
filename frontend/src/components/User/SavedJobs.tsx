
import { useContext } from "react";
import { useSelector } from "react-redux";
// import { useDebounceJob } from "../../Features/debounce";
import { RootState } from "../../redux/store";
import Spinner from "../Menu/Spinner";
import { ThemeContext } from "../../context/ThemeContext";
import SavedJobCard from "./SavedJobCard";
import { SavedJob } from "../../job.d";

export default function SavedJobs({ savedJobs }: { savedJobs: SavedJob[] }) {
    const { savedJobsStatus } = useSelector((state: RootState) => state.jobs)
    console.log(savedJobs)
    let content;
    // const debouncedJob = useDebounceJob(savedCurrentJob, 0.4);

    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";

    if (savedJobsStatus === "loading") {
        content = <Spinner />
    } else if (savedJobsStatus === "fulfilled") {
        content =
            <section className="flex gap-4 lg:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden'>
                    {savedJobs && savedJobs.map((savedJob, index) => (<SavedJobCard key={index} job={savedJob} />))}
                </ul>
                {/* {jobModalStatus.includes("open") &&
                    <section className={`${theme} flex flex-col flex-1 sticky top-20 p-3 mt-10 rounded-md h-[80dvh] divide-y divide-slate-800/20 `}>
                        {}
                    </section>
                } */}
            </section>
    }

    return (
        <>
            {content}
        </>
    )
}