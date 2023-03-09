import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/users/userSlice";
// Add all slices so it will be available in entire app through
// provider in the index.Js 
export const store = configureStore({
    reducer: {
        posts: postSlice,
        users: userSlice,
    }
})