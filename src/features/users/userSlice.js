import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 1, name: "Djakoua didier"},
    {id: 2, name: "Didier Snake"},
    {id: 3, name: "Mr Nelson"},
]

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer