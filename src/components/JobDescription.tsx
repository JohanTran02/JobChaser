import { JobTest } from "../job.d";

export default function JobDescription({ currentJob }: { currentJob: JobTest }) {

    return (
        <>
            <section className="flex flex-col flex-1 sticky top-12 mt-10 rounded-md bg-slate-100 h-[80dvh] text-black">
                <h1>{currentJob.headline}</h1>
                <h1 className="text-2xl font-bold">{currentJob.employer.name}</h1>
                <h2>{currentJob.workplace_address.municipality}</h2>
                <article className="overflow-x-hidden whitespace-pre-line">
                    {FormatText(currentJob.description.text_formatted)}
                </article>
                <button><a href={`${currentJob.application_details.url}`} target="_blank" rel="noopener noreferrer">Ansök till företaget</a></button>
            </section>
        </>
    )
}

function FormatText(text_formatted: string) {
    // const test = <p>Går du i tankarna att testa något nytt? Vill du planera din sommar i god tid?</p>;
    return (
        text_formatted
    )
}