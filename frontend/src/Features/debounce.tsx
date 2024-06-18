import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Job } from "../job.d";
import { RootState } from "../redux/store";
import JobDescription from "../components/Jobs/JobDescription";
import SkeletonDescription from "../components/Jobs/SkeletonDescription";

export function useDebounce(value: string, seconds: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, seconds * 1000);

        return () => clearTimeout(handler)
    }, [value, seconds]);

    return debouncedValue;
}

export function useDebounceJob(value: Job, seconds: number): JSX.Element {
    const { jobModalStatus } = useSelector((state: RootState) => state.jobs)

    const [debouncedJob, setDebouncedValue] = useState<JSX.Element>(<SkeletonDescription />);

    useEffect(() => {
        setDebouncedValue(<SkeletonDescription />)
        const handler = setTimeout(() => {
            if (jobModalStatus.includes("open")) setDebouncedValue(<JobDescription currentJob={value} />);
        }, seconds * 1000);

        return () => clearTimeout(handler)
    }, [value, seconds, jobModalStatus]);

    return debouncedJob;
}