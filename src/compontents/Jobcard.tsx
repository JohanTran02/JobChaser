// import { Job } from "../job.d";

export function JobCard() {
    return (
        <>
            <li className="w-1/2">
                <article className="flex flex-col gap-1 bg-slate-100 text-black rounded-md p-2">
                    <div className="flex justify-between">
                        <img src="#" alt="Company logo" />
                        <img src="#" alt="Favorite" />
                    </div>
                    <h1 className="text-2xl font-bold">Company Name</h1>
                    <h2 className="text-xl font-semibold">Job position, Contract</h2>
                    <h4 className="text-sm font-light mt-2">Published At</h4>
                </article>
            </li>
        </>
    );
}

export default JobCard;