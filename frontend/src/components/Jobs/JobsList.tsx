
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDebounceJob } from "../../Features/debounce";
import { RootState } from "../../redux/store";
import Spinner from "../Menu/Spinner";
import JobCard from "./JobCard";
import { ThemeContext } from "../../context/ThemeContext";
import { Job } from "../../job.d";

export default function JobsList({ jobs }: { jobs: Job[] }) {
    const { jobsStatus, currentJob, jobModalStatus, savedJobs } = useSelector((state: RootState) => state.jobs)
    const debouncedJob = useDebounceJob(currentJob, jobModalStatus, 0.4);
    let content;

    let theme = useContext(ThemeContext);
    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";

    if (jobsStatus === "loading") {
        content = <Spinner />
    } else if (jobsStatus === "fulfilled") {
        content =
            <section className="flex gap-4 lg:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden'>
                    {jobs && jobs.map(job => {
                        const findSavedJob = savedJobs.find(savedJob => savedJob.id === job.id);
                        if (findSavedJob) {
                            return <JobCard key={job.id} job={job} savedStatus="saved" />
                        }
                        return <JobCard key={job.id} job={job} savedStatus="notSaved" />
                    })}
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