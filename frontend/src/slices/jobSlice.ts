import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobSuggestions, Job } from '../job.d'
import { FetchStatus, ModalStatus } from '../job.d'


export interface JobState {
    input: string,
    tools: string[],
    jobs: Job[],
    currentJob: Job,
    searchQuery: string,
    jobsStatus: FetchStatus,
    searchStatus: FetchStatus,
    searches: JobSuggestions[],
    jobModalStatus: ModalStatus,
    suggestedModalStatus: ModalStatus
    error: string | null | undefined
}

const initialState: JobState = {
    input: "",
    tools: [],
    jobs: [],
    currentJob: {} as Job,
    searchQuery: "",
    jobsStatus: "idle",
    searchStatus: "idle",
    searches: [],
    jobModalStatus: "closed",
    suggestedModalStatus: "closed",
    error: null
}

function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async (search: string) => {

        await wait(0.5);
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${search}`)
        const json = await response.json();
        const data: Job[] = json.hits;
        return data;
        //Lägg in en endpoint som template literal istället för search? 
        // Alltså type : "search" eller "type" : "complete"
    }
)

export const fetchJobsSearches = createAsyncThunk(
    "jobs/fetchSearches",
    async (search: string) => {
        await wait(0.5);
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/complete?q=${search}`)
        const json = await response.json();
        const data: JobSuggestions[] = json.typeahead;
        return data;
    }
)

//Ändra fetch funktionen till en createasyncthunk
export const JobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.jobsStatus = "idle";
            state.searchQuery = action.payload;
        },
        setCurrentJob: (state, action: PayloadAction<number>) => {
            const currentJob = state.jobs.filter((job: Job) => job.id === action.payload)[0]
            state.currentJob = currentJob;
        },
        setJobModalStatus: (state, action: PayloadAction<ModalStatus>) => {
            state.jobModalStatus = action.payload;
        },
        setSuggestedModalStatus: (state, action: PayloadAction<ModalStatus>) => {
            state.suggestedModalStatus = action.payload;
        },
        setStatus: (state, action: PayloadAction<FetchStatus>) => {
            state.jobsStatus = action.payload;
        },
        addTools: (state, action: PayloadAction<string>) => {
            state.tools.push(action.payload);
        },
        deleteTools: (state, action: PayloadAction<string>) => {
            state.tools = state.tools.filter((tool) => tool.toLowerCase() !== action.payload.toLowerCase());
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchJobs.pending, (state) => {
            state.jobsStatus = "loading";
        })
        builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
            state.jobsStatus = "fulfilled";
            state.jobs = action.payload;

            const currentJob = state.jobs[0];

            state.currentJob = currentJob;
            state.jobModalStatus = "open";
        })
        builder.addCase(fetchJobs.rejected, (state, action) => {
            state.jobsStatus = "rejected";
            state.error = action.error.message;
        })
        builder.addCase(fetchJobsSearches.pending, (state) => {
            state.searchStatus = "loading";
        })
        builder.addCase(fetchJobsSearches.fulfilled, (state, action: PayloadAction<JobSuggestions[]>) => {
            state.searchStatus = "fulfilled";
            state.searches = action.payload.slice(0, 5);
        })
        builder.addCase(fetchJobsSearches.rejected, (state, action) => {
            state.searchStatus = "rejected";
            state.error = action.error.message;
        })
    },
})
export const {
    setInput,
    addTools,
    deleteTools,
    setSearchQuery,
    setStatus,
    setCurrentJob,
    setJobModalStatus,
    setSuggestedModalStatus,
} = JobSlice.actions

export default JobSlice.reducer;