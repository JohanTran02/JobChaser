

export default function SkeletonDescription() {
    return (
        <>
            <div className="animate-pulse divide-y divide-slate-800/20">
                <div className="space-y-2">
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
        </>
    )
}