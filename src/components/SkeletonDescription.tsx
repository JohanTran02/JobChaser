import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SkeletonDescription() {
    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ? "dark:bg-slate-600" : "bg-slate-300 text-black";
    return (
        <>
            <section className={`${theme} flex flex-col flex-1 sticky top-12 p-3 mt-10 rounded-md h-[80dvh] `}>
                <div className="animate-pulse divide-y divide-slate-800/20">
                    <div className="space-y-1">
                        <div className="h-4 w-3/4 bg-slate-400 rounded-full"></div>
                        <div className="h-3 w-2/4 bg-slate-400 rounded-full"></div>
                        <div className="h-3 w-1/4 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="mt-4 pt-4 space-y-1">
                        <div className="h-3 w-3/5 bg-slate-400 rounded-full"></div>
                        <div className="h-3 w-5/6 bg-slate-400 rounded-full"></div>
                        <div className="h-3 w-3/4 bg-slate-400 rounded-full"></div>
                        <div className="h-3 w-1/2 bg-slate-400 rounded-full"></div>
                    </div>
                </div>
            </section>
        </>
    )
}