import { useEffect } from "react";
import UserInfo from "../components/User/UserInfo";
import UserMenu from "../components/User/UserMenu";
import { fetchSavedJobs } from "../slices/jobSlice";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import SavedJobs from "../components/User/SavedJobs";

export default function Profile() {
    const [cookies] = useCookies(["token", "user"])
    const { savedJobsStatus } = useSelector((state: RootState) => state.jobs)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (savedJobsStatus.includes("idle")) {
            dispatch(fetchSavedJobs({ userid: cookies.user.id, token: cookies.token }))
        }
    }, [cookies, savedJobsStatus, dispatch])

    return (
        <>
            <UserInfo />
            <UserMenu />
            <SavedJobs />
        </>)
}