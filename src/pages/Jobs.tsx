import Menu from "../components/Menu";
import JobCards from "../components/JobCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setInput, setSearchQuery } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function Jobs() {
    const { input, jobs, searchQuery, status } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchJobs(searchQuery))
        }
    }, [searchQuery, status, dispatch])

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

    if (status === "loading") {
        content = <Spinner />
    } else if (status === "fulfilled") {
        content = jobs.map(job => (
            <JobCards key={job.id} job={job} />
        ));
    }

    return (
        <>
            <Menu onSubmit={submit} onSearch={search} input={input} />
            <ul className='flex flex-col gap-4 mt-10'>
                {content}
            </ul>
        </>
    )
}

// { jobs }: { jobs: Job[] }