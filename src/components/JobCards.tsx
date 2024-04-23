import { JobTest } from "../job.d";

export function JobCards({ job }: { job: JobTest }) {
    return (
        <>
            <li className="w-1/2">
                <article className="flex flex-col gap-1 bg-slate-100 text-black rounded-md p-2">
                    <div className="w-32">
                        <img src={job.logo_url} alt="Company logo" loading="lazy" className="w-full object-contain" />
                        {/* <img src="#" alt="Favorite" /> */}
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
export default JobCards;

