import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: 1, title: "Learn redux toolkit", content: "i've learned good things" },
    {id: 2, title: "Slice....", content: "The more i slice the more i want pizza" }
]

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // normally not the xorrext way but here immer js manages it
        // it works only in creatSlice
        state.push(action.payload);
          },
        //handle the data structure with prepare callback 
          prepare(title, content) {
              return {
                  payload: {
                      id: nanoid(),
                      title,
                      content
                }
                
            }
        }
    },
  },
});
// Set state to use in component
export const selectAllPosts = (state) => state.posts

export const {postAdded} = postsSlice.actions 

export default postsSlice.reducer