import { configureStore } from '@reduxjs/toolkit'
import jobReducer from '../slices/jobSlice'
import { jobApi } from '../slices/jobApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'


export const store = configureStore({
    reducer: {
        jobs: jobReducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
setupListeners(store.dispatch);