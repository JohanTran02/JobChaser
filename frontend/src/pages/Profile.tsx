import JobsList from "../components/Jobs/JobsList";
import Menu from "../components/Menu/Menu";
import UserInfo from "../components/User/UserInfo";

export default function Profile() {
    return (
        <>
            <UserInfo />
            <Menu />
            <JobsList />
        </>)
}