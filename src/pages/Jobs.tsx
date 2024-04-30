import Menu from "../components/Menu";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsSearches, setInput, setJobModalStatus, setSearchQuery } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobDescription from "../components/JobDescription";
import SkeletonDescription from "../components/SkeletonDescription";
import { Job } from "../job.d";

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

function useDebounceJob(value: Job, seconds: number): JSX.Element {
    const [debouncedJob, setDebouncedValue] = useState<JSX.Element>(<SkeletonDescription />);

    useEffect(() => {
        setDebouncedValue(<SkeletonDescription />)
        const handler = setTimeout(() => {
            setDebouncedValue(<JobDescription currentJob={value} />);
        }, seconds * 1000);

        return () => clearTimeout(handler)
    }, [value, seconds]);

    return debouncedJob;
}


export default function Jobs() {
    const { input, jobs, searchQuery, jobsStatus, currentJob, jobModalStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();
    let content;
    const debouncedInput = useDebounce(input, 0.4);
    const debouncedJob = useDebounceJob(currentJob, 0.5);

    useEffect(() => {
        if (jobsStatus.includes("idle")) {
            dispatch(fetchJobs(searchQuery))
            dispatch(setJobModalStatus("closed"));
        }
    }, [searchQuery, jobsStatus, dispatch])

    useEffect(() => {
        dispatch(fetchJobsSearches(debouncedInput))
    }, [debouncedInput, dispatch])

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
            <Menu onSubmit={submit} onSearch={search} input={input} />
            {content}
        </>
    )
}

// { jobs }: { jobs: Job[] }