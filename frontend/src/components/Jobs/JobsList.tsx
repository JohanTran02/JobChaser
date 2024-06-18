
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounceJob } from "../../Features/debounce";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchJobs, setJobModalStatus } from "../../slices/jobSlice";
import Spinner from "../Menu/Spinner";
import JobCard from "./JobCard";
import { ThemeContext } from "../../context/ThemeContext";

export default function JobsList() {
    const { jobs, searchQuery, jobsStatus, currentJob, jobModalStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();
    let content;
    const debouncedJob = useDebounceJob(currentJob, 0.4);

    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";

    useEffect(() => {
        if (jobsStatus.includes("idle")) {
            dispatch(fetchJobs(searchQuery))
            dispatch(setJobModalStatus("closed"));
        }
    }, [searchQuery, jobsStatus, dispatch])

    if (jobsStatus === "loading") {
        content = <Spinner />
    } else if (jobsStatus === "fulfilled") {
        content =
            <section className="flex gap-4 lg:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden'>
                    {jobs && jobs.map(job => (<JobCard key={job.id} job={job} />))}
                </ul>
                {jobModalStatus.includes("open") &&
                    <section className={`${theme} flex flex-col flex-1 sticky top-20 p-3 mt-10 rounded-md h-[80dvh] divide-y divide-slate-800/20 `}>
                        {debouncedJob}
                    </section>
                }
            </section>
    }

    return (
        <>
            {content}
        </>
    )
}