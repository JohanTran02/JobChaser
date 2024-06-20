import Menu from "../components/Menu/Menu";
import JobsList from "../components/Jobs/JobsList";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchJobs, fetchSavedJobs } from "../slices/jobSlice";
import { useCookies } from "react-cookie";

export default function Jobs() {
    const [cookies] = useCookies(["token", "user"])
    const { jobs, searchQuery, jobsStatus, savedJobsStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (jobsStatus.includes("idle")) {
            dispatch(fetchJobs(searchQuery))
        }
        if (savedJobsStatus.includes("idle") && (cookies.token && cookies.user)) {
            dispatch(fetchSavedJobs({ userid: cookies.user.id, token: cookies.token }))
        }
    }, [cookies, searchQuery, jobsStatus, dispatch, savedJobsStatus])

    return (
        <>
            <Menu />
            <JobsList jobs={jobs} />
        </>
    )
}

// { jobs }: { jobs: Job[] }