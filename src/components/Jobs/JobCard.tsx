import { Job } from "../../job.d";
import { setCurrentJob } from "../../slices/jobSlice";
import { useAppDispatch } from "../../redux/store";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";


export default function JobCard({ job }: { job: Job }) {
    const dispatch = useAppDispatch();
    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600 hover:bg-slate-700" : "bg-slate-300 hover:bg-slate-400 text-black";

    function getItem(id: number) {
        dispatch(setCurrentJob(id))
    }

    return (
        <>
            <li key={job.id} onClick={() => getItem(job.id)} className={`${theme} rounded-md p-2`}>
                <div className="w-32">
                    <img src={job.logo_url} alt="Company logo" loading="lazy" className="w-full object-contain" />
                </div>
                <h1 className="text-2xl font-bold">{job.employer.name}</h1>
                <h2>{job.workplace_address.municipality}</h2>
                <article className="flex flex-col gap-1">
                    <p className="text-xl font-semibold line-clamp-4">{job.description.text}</p>
                </article>
                <p className="text-sm font-light mt-2">{job.application_deadline}</p>
            </li>
        </>
    );
}

//gammal kod
// jobs : Job[] { ...jobsList }: { jobs: Job[] }

