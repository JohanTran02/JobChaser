import { SavedJob } from "../../job.d";
// import { setCurrentJob } from "../../slices/jobSlice";
// import { useAppDispatch } from "../../redux/store";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jobsCreateFetch, jobsDeleteFetch } from "../../Features/Jobs/jobs";

export default function SavedJobCard({ job }: { job: SavedJob }) {
    const navigate = useNavigate();
    const [cookies] = useCookies(["token", "user"]);
    const [bookMark, setBookMark] = useState<"saved" | "notSaved">("notSaved");
    const [bookMarkColor, setBookMarkColor] = useState<"fill-black" | "fill-white" | "fill-none">("fill-none")
    // const dispatch = useAppDispatch();
    let theme = useContext(ThemeContext);

    useEffect(() => {
        if (bookMark === "saved") {
            theme.includes("dark") ? setBookMarkColor("fill-white") : setBookMarkColor("fill-black");
        }
        else {
            setBookMarkColor("fill-none")
        }
    }, [theme, setBookMarkColor, bookMark])

    theme = theme.includes("dark") ? "dark:bg-slate-600 hover:bg-slate-700" : "bg-slate-300 hover:bg-slate-400 text-black";

    // function getItem(id: number) {
    //     dispatch(setCurrentJob(id))
    // }

    async function changeBookMark() {
        if (!cookies.token && !cookies.user) return navigate("/JobChaser/SignUp");
        if (bookMark === "notSaved") {
            setBookMark("saved")
            await jobsCreateFetch(cookies.user.id, String(job.id), cookies.token, job as SavedJob)
        }
        else {
            setBookMark("notSaved")
            setBookMarkColor("fill-none")
            await jobsDeleteFetch(cookies.user.id, String(job.id), cookies.token)
        }
    }

    // return <div>test</div>
    return (
        <>
            <li key={job.id} className={`${theme} rounded-md p-2 cursor-pointer`}>
                <div className="flex relative">
                    <BookmarkIcon className={
                        `size-8 absolute right-0 ${bookMarkColor}`
                    } onClick={changeBookMark}></BookmarkIcon>
                </div>
                {/* onClick={() => getItem(job.id)} */}
                <section className="space-y-2">
                    <img src={job.logo_url} alt="Company logo" loading="lazy" className="size-32 object-contain" />
                    <article className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">{job.employer.name}</h1>
                        <h2>{job.workplace_address.municipality}</h2>
                    </article>
                    <p className="text-sm font-light mt-2">{`Publicated - ${new Date(job.publication_date).toLocaleString("sv-SE")}`}</p>
                </section>
            </li>
        </>
    );
}

//gammal kod
// jobs : Job[] { ...jobsList }: { jobs: Job[] }

