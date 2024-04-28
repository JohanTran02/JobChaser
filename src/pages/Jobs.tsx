import Menu from "../components/Menu";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsSearches, setInput, setModalStatus, setSearchQuery } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import JobDescription from "../components/JobDescription";

export default function Jobs() {
    const { input, jobs, searchQuery, jobsStatus, currentJob, modalStatus, searches } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();
    let content;

    useEffect(() => {
        if (jobsStatus.includes("idle")) {
            dispatch(fetchJobs(searchQuery))
            dispatch(setModalStatus("closed"));
        }
    }, [searchQuery, jobsStatus, dispatch])

    useEffect(() => {
        dispatch(fetchJobsSearches(input))
        console.log(searches);
    }, [input, dispatch])

    const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
                {modalStatus.includes("open") && <JobDescription currentJob={currentJob}></JobDescription>}
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