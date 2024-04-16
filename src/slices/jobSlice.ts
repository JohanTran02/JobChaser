import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Job } from '../job.d'

export interface JobState {
    input: string,
    tools: string[],
    jobs: Job[]
}

const initialState: JobState = {
    input: "",
    tools: [],
    jobs: [],
}

export const JobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
            // jobs.filter((job) => job.company.toLowerCase().includes(input.toLowerCase()))
        },
        addTools: (state, action: PayloadAction<string>) => {
            state.tools.push(action.payload);
        },
        deleteTools: (state, action: PayloadAction<string>) => {
            state.tools = state.tools.filter((tool) => tool.toLowerCase() !== action.payload.toLowerCase());
        },
        filterJobs: (state, action: PayloadAction<Job[]>) => {
            state.jobs = action.payload.filter((job) => job.company.toLowerCase().includes(state.input.toLowerCase()));
        }
    }
})

export const { setInput, addTools, deleteTools } = JobSlice.actions

export default JobSlice.reducer;