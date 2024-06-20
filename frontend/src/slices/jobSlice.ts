import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobSuggestions, Job, SavedJob } from '../job.d'
import { FetchStatus, ModalStatus } from '../job.d'


export interface JobState {
    input: string,
    tools: string[],
    jobs: Job[],
    savedJobs: SavedJob[],
    currentJob: Job,
    savedCurrentJob: SavedJob,
    searchQuery: string,
    jobsStatus: FetchStatus,
    savedJobsStatus: FetchStatus,
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
    savedJobs: [],
    currentJob: {} as Job,
    savedCurrentJob: {} as SavedJob,
    searchQuery: "",
    jobsStatus: "idle",
    savedJobsStatus: "idle",
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

export const fetchSavedJobs = createAsyncThunk<SavedJob[], { userid: string, token: string }>(
    "jobs/fetchSavedJobs",
    async ({ userid, token }) => {
        await wait(0.5);
        const response = await fetch(`http://localhost:3000/api/jobs/users/${userid}`, {
            method: "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const result = await response.json();
        const data: SavedJob[] = result;

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
            state.jobModalStatus = "closed";
        })
        builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
            state.jobsStatus = "fulfilled";
            state.jobs = action.payload;

            const currentJob = state.jobs[0];

            state.currentJob = currentJob;
            state.jobModalStatus = "open";
        })
        builder.addCase(fetchJobs.rejected, (state, action) => {
            state.savedJobsStatus = "rejected";
            state.error = action.error.message;
        })
        builder.addCase(fetchSavedJobs.pending, (state) => {
            state.savedJobsStatus = "loading";
            state.jobModalStatus = "closed";
        })
        builder.addCase(fetchSavedJobs.fulfilled, (state, action: PayloadAction<SavedJob[]>) => {
            state.savedJobsStatus = "fulfilled";
            state.savedJobs = action.payload;

            const currentJob = state.savedJobs[0];
            if (state.savedJobs.length < 1) {
                state.savedCurrentJob = currentJob;
                state.jobModalStatus = "closed";
            }
            else {
                state.savedCurrentJob = currentJob;
                state.jobModalStatus = "open";
            }
        })
        builder.addCase(fetchSavedJobs.rejected, (state, action) => {
            state.savedJobsStatus = "rejected";
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