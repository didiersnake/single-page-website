import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const USER_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = []

//fetch data 
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(USER_URL)
    return [...response.data]
})
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        }).addCase(fetchUsers.rejected, (state, action) => {
            return action.error.message
        })
    }
})

// Load users when app starts in index.js 
export const selectAllUsers = (state) => state.users;

export default userSlice.reducer