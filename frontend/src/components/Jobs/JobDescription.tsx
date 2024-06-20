import { Job } from "../../job.d";
import parse from "html-react-parser"

export default function JobDescription({ currentJob }: { currentJob: Job }) {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">{currentJob.headline}</h1>
                <h2 className="text-lg font-bold">{currentJob.employer.name}</h2>
                <h3>{currentJob.workplace_address.municipality}</h3>
                <button>
                    <a href={`${currentJob.application_details.url || currentJob.employer.url}`} target="_blank" rel="noopener noreferrer">Ansök till företaget</a>
                </button>
            </div>
            <article className="overflow-x-hidden whitespace-pre-line [&_p]:pb-2 [&_strong]:text-lg ">
                {parse(currentJob.description.text_formatted)}
            </article>
        </>
    )
}