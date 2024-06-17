import Menu from "../components/Menu/Menu";
import JobsList from "../components/Jobs/JobsList";

export default function Jobs() {
    return (
        <>
            <Menu />
            <JobsList />
        </>
    )
}

// { jobs }: { jobs: Job[] }