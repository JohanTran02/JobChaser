import { useState, useEffect } from "react";
import { Job, ModalStatus } from "../job.d";
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

export function useDebounceJob(value: Job, status: ModalStatus, seconds: number): JSX.Element {
    const [debouncedJob, setDebouncedValue] = useState<JSX.Element>(<SkeletonDescription />);

    useEffect(() => {
        setDebouncedValue(<SkeletonDescription />)
        const handler = setTimeout(() => {
            if (status.includes("open")) setDebouncedValue(<JobDescription currentJob={value} />);
        }, seconds * 1000);

        return () => clearTimeout(handler)
    }, [value, seconds, status]);

    return debouncedJob;
}