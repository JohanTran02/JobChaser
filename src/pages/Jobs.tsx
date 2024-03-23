import { useState } from "react";
import Menu from "../components/Menu";
import { Job } from "../job.d";
import JobCards from "../components/JobCards";

export function Jobs({ jobs }: { jobs: Job[] }) {
    const [input, setInput] = useState('');


    const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const filteredJobs = jobs.filter((job) => job.company.toLowerCase().includes(input.toLowerCase()));

    return (
        <>
            <Menu onSearch={search} input={input} />
            <ul className='flex flex-col gap-4 mt-10'>
                {jobs && jobs ? <JobCards jobs={filteredJobs} /> : <p>Data loading...</p>}
            </ul>
        </>
    )
}

export default Jobs;

