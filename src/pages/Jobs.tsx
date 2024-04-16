// import { useState } from "react";
import Menu from "../components/Menu";
import { Job } from "../job.d";
import JobCards from "../components/JobCards";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../slices/jobSlice";
import { RootState } from "../redux/store";

export default function Jobs({ jobs }: { jobs: Job[] }) {
    // const [input, setInput] = useState('');
    const { input, tools } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch();

    const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(setInput(e.target.value));
    }

    const filteredJobs = jobs.filter((job) => job.company.toLowerCase().includes(input.toLowerCase()) && job.tools.join("").toLowerCase().includes(tools.join("").toLowerCase()));

    return (
        <>
            <Menu onSearch={search} input={input} />
            <ul className='flex flex-col gap-4 mt-10'>
                {jobs && jobs ? <JobCards jobs={filteredJobs} /> : <p>Data loading...</p>}
            </ul>
        </>
    )
}

