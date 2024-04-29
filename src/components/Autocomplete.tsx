import { JobSuggestions } from "../job.d";

export default function AutoComplete({ search }: { search: JobSuggestions }) {
    return (
        <>
            <li>{search.found_phrase}</li>
        </>
    )
}