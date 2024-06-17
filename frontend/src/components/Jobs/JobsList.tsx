
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounceJob } from "../../Features/debounce";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchJobs, setJobModalStatus } from "../../slices/jobSlice";
import Spinner from "../Menu/Spinner";
import JobCard from "./JobCard";

export default function JobsList() {
    const { jobs, searchQuery, jobsStatus, currentJob, jobModalStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();
    let content;
    const debouncedJob = useDebounceJob(currentJob, 0.4);

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
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden cursor-pointer'>
                    {jobs && jobs.map(job => (<JobCard key={job.id} job={job} />))}
                </ul>
                {jobModalStatus.includes("open") &&
                    debouncedJob
                }
            </section>
    }

    return (
        <>
            {content}
        </>
    )
}