import { useDispatch, useSelector } from "react-redux";
import { JobTest } from "../job.d";
import { setCurrentJob, setModalStatus } from "../slices/jobSlice";
import { AppDispatch, RootState } from "../redux/store";

export function JobCard({ job }: { job: JobTest }) {
    const dispatch = useDispatch<AppDispatch>();
    const { modalStatus } = useSelector((root: RootState) => root.jobs);

    function getItem(id: number) {
        if (modalStatus.includes("closed")) {
            dispatch(setCurrentJob(id))
            dispatch(setModalStatus("open"))
        }
        else {
            dispatch(setModalStatus("closed"))
        }
    }

    return (
        <>
            <li key={job.id} onClick={() => getItem(job.id)}>
                <article className="flex flex-col gap-1 bg-slate-100 text-black rounded-md p-2">
                    <div className="w-32">
                        <img src={job.logo_url} alt="Company logo" loading="lazy" className="w-full object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold">{job.employer.name}</h1>
                    <h2>{job.workplace_address.municipality}</h2>
                    <p className="text-xl font-semibold line-clamp-4">{job.description.text}</p>
                    <h4 className="text-sm font-light mt-2">{job.application_deadline}</h4>
                </article>
            </li>
        </>
    );
}

//gammal kod
// jobs : Job[] { ...jobsList }: { jobs: Job[] }
export default JobCard;

