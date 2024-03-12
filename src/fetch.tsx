import { useState, useEffect } from "react";
import { Job } from "./job.d";

const useFetch = (url: string) => {
    const [data, setData] = useState<Job[]>([]);

    useEffect(() => {
        const getApiData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Network issues");
                }

                const data = await response.json();

                setData(data);
            }
            catch (e) {
                console.error(e);
            }
        }
        getApiData();
    }, [url]);

    return data;
}

//https://gitlab.com/arbetsformedlingen/job-ads/jobsearch-apis/-/blob/main/docs/GettingStartedJobSearchSE.md#Endpoints
export default useFetch;