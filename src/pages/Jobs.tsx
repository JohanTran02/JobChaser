import Menu from "../components/Menu";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsSearches, setInput, setJobModalStatus, setSearchQuery } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobDescription from "../components/JobDescription";

function useDebounce(value: string, seconds: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, seconds * 1000);

        return () => clearTimeout(handler)
    }, [value, seconds]);

    return debouncedValue;
}

export default function Jobs() {
    const { input, jobs, searchQuery, jobsStatus, currentJob, jobModalStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();
    let content;
    const debouncedTerm = useDebounce(input, 0.4);

    useEffect(() => {
        if (jobsStatus.includes("idle")) {
            dispatch(fetchJobs(searchQuery))
            dispatch(setJobModalStatus("closed"));
        }
    }, [searchQuery, jobsStatus, dispatch])

    useEffect(() => {
        dispatch(fetchJobsSearches(debouncedTerm))
    }, [debouncedTerm, dispatch])

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const searchValue = e.target.value;
        dispatch(setInput(searchValue));
    }

    const submit = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(setSearchQuery(input));
    }

    if (jobsStatus === "loading") {
        content = <Spinner />
    } else if (jobsStatus === "fulfilled") {
        content =
            <section className="flex gap-4 lg:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2 max-sm:hidden'>
                    {jobs && jobs.map(job => (<JobCard key={job.id} job={job} />))}
                </ul>
                {jobModalStatus.includes("open") && <JobDescription currentJob={currentJob}></JobDescription>}
            </section>
    }

    return (
        <>
            <Menu onSubmit={submit} onSearch={search} input={input} />
            {content}
        </>
    )
}

// { jobs }: { jobs: Job[] }