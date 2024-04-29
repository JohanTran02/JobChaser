import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Job } from "../job.d";
import parse from "html-react-parser"

export default function JobDescription({ currentJob }: { currentJob: Job }) {
    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";
    return (
        <>
            <section className={`${theme} flex flex-col flex-1 sticky top-12 p-3 mt-10 rounded-md h-[80dvh]`}>
                <h1 className="text-2xl font-bold">{currentJob.headline}</h1>
                <h2 className="text-lg font-bold">{currentJob.employer.name}</h2>
                <h3>{currentJob.workplace_address.municipality}</h3>
                <button><a href={`${currentJob.application_details.url}`} target="_blank" rel="noopener noreferrer">Ansök till företaget</a></button>
                <article className="overflow-x-hidden whitespace-pre-line [&_p]:pb-2 [&_strong]:text-lg">
                    {parse(currentJob.description.text_formatted)}
                </article>
            </section>
        </>
    )
}