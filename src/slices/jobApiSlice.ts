import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobTest } from "../job.d";

export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jobsearch.api.jobtechdev.se/" }),
    endpoints: (builder) => ({
        getJobByName: builder.query<JobTest[], string>({
            query: (name) => `search?q=${name}`,
        }),
    }),
})

export const { useGetJobByNameQuery } = jobApi;