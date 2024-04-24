import Menu from "../components/Menu";
import JobCard from "../components/JobCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setInput, setSearchQuery } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import JobDescription from "../components/JobDescription";

export default function Jobs() {
    const { input, jobs, searchQuery, status, currentJob, modalStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchJobs(searchQuery))
        }
    }, [searchQuery, status, dispatch])

    // useEffect(() => {

    // }, [currentJob])

    const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const searchValue = e.target.value;
        dispatch(setInput(searchValue));
    }

    const submit = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(setSearchQuery(input));
    }

    let content;
    console.log(modalStatus);

    if (status === "loading") {
        content = <Spinner />
    } else if (status === "fulfilled") {
        content =
            <section className="flex gap-4 md:px-32">
                <ul className='flex flex-col gap-4 mt-10 w-1/2'>
                    {jobs.map(job => (<JobCard key={job.id} job={job} />))}
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