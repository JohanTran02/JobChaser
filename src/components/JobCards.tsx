import { Job } from "../job.d";

export function JobCards({ jobs }: { jobs: Job[] }) {
    return (
        <>
            {jobs.map((job: Job) => {
                return <li key={job.id} className="w-1/2">
                    <article className="flex flex-col gap-1 bg-slate-100 text-black rounded-md p-2">
                        <div className="flex justify-between">
                            <img src={job.logo} alt="Company logo" loading="lazy" />
                            {/* <img src="#" alt="Favorite" /> */}
                        </div>
                        <h1 className="text-2xl font-bold">{job.company}</h1>
                        <h2 className="text-xl font-semibold">{job.position}, {job.contract}</h2>
                        <h4 className="text-sm font-light mt-2">{job.postedAt}</h4>
                    </article>
                </li>
            })}
        </>
    );
}

//gammal kod
// jobs : Job[] { ...jobsList }: { jobs: Job[] }
export default JobCards;