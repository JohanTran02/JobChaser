import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobTest } from '../job.d'


type FetchStatus = "idle" | "loading" | "fulfilled" | "rejected";
type ModalStatus = "open" | "closed";


export interface JobState {
    input: string,
    tools: string[],
    jobs: JobTest[],
    currentJob: JobTest,
    searchQuery: string,
    jobsStatus: FetchStatus,
    searchStatus: FetchStatus,
    searches: [],
    modalStatus: ModalStatus
}

const initialState: JobState = {
    input: "",
    tools: [],
    jobs: [],
    currentJob: {} as JobTest,
    searchQuery: "",
    jobsStatus: "idle",
    searchStatus: "idle",
    searches: [],
    modalStatus: "closed"
}

function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async (search: string) => {
        await wait(0.5);
        //Lägg in en endpoint som template literal istället för search?
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${search}`)
        const json = await response.json();
        const data: JobTest[] = json.hits;
        console.log(data);
        return data;
    }
)

export const fetchJobsSearches = createAsyncThunk(
    "jobs/fetchSearches",
    async (search: string) => {
        await wait(0.5);
        //Lägg in en endpoint som template literal istället för search?
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/complete?q=${search}`)
        const json = await response.json();
        const data: [] = json;
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
            const currentJob = state.jobs.filter((job: JobTest) => job.id === action.payload)[0]
            state.currentJob = currentJob;
        },
        setModalStatus: (state, action: PayloadAction<ModalStatus>) => {
            state.modalStatus = action.payload;
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
        builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<JobTest[]>) => {
            state.jobsStatus = "fulfilled";
            state.jobs = action.payload;
        })
        builder.addCase(fetchJobsSearches.pending, (state) => {
            state.searchStatus = "loading";
        })
        builder.addCase(fetchJobsSearches.fulfilled, (state, action: PayloadAction<[]>) => {
            state.searchStatus = "fulfilled";
            state.searches = action.payload;
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
    setModalStatus,
} = JobSlice.actions

export default JobSlice.reducer;