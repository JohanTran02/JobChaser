import JobsList from "../components/Jobs/JobsList";
import UserInfo from "../components/User/UserInfo";
import UserMenu from "../components/User/UserMenu";

export default function Profile() {
    return (
        <>
            <UserInfo />
            <UserMenu />
            <JobsList />
        </>)
}