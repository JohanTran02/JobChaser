import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobTest } from '../job.d'
// import { jobApi } from './jobApiSlice'

export interface JobState {
    input: string,
    tools: string[],
    jobs: JobTest[],
    searchQuery: string,
    status: "idle" | "loading" | "fulfilled" | "rejected";
}

const initialState: JobState = {
    input: "",
    tools: [],
    jobs: [],
    searchQuery: "",
    status: "idle",
}

export const fetchJobs = createAsyncThunk(
    "jobs/fetchBySearch",
    async (search: string) => {
        //Lägg in en endpoint som template literal istället för search?
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${search}`)
        const json = await response.json();
        const data: JobTest[] = json.hits;
        return data;
    },
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
            state.status = "idle";
            state.searchQuery = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "fulfilled" | "rejected">) => {
            state.status = action.payload;
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
            state.status = "loading";
        })
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.jobs = action.payload;
        })
    },
})
export const { setInput, addTools, deleteTools, setSearchQuery, setStatus } = JobSlice.actions

export default JobSlice.reducer;