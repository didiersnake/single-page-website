import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/post/postSlice";
// Add all slices so it will be available in entire app through
// provider in the index.Js 
export const store = configureStore({
    reducer: {
        posts: postSlice,
    }
})