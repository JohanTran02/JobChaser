import { useEffect } from "react";
import SavedJobs from "../components/User/SavedJobs";
import UserInfo from "../components/User/UserInfo";
import UserMenu from "../components/User/UserMenu";
import { fetchSavedJobs } from "../slices/jobSlice";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export default function Profile() {
    const [cookies] = useCookies(["token", "user"])
    const { savedJobs, savedJobsStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (savedJobsStatus.includes("idle")) {
            dispatch(fetchSavedJobs({ userid: cookies.user.id, token: cookies.token }))
            // dispatch(setJobModalStatus("closed"));
        }
    }, [cookies, savedJobsStatus, dispatch])

    console.log(savedJobs)
    return (
        <>
            <UserInfo />
            <UserMenu />
            <SavedJobs savedJobs={savedJobs} />
        </>)
}