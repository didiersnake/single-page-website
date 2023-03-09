import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";


const initialState = [
  {
    id: 1,
    title: "Learn redux toolkit",
    content: "i've learned good things",
    date: sub(new Date(), { minutes: 10 }).toISOString(), //set time minus 10 minutes 
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: 2,
    title: "Slice....",
    content: "The more i slice the more i want pizza",
    date: sub(new Date(), { minutes: 5 }).toISOString(), // subtract 5 minutes from time
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
];

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
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      //if post exist increment the reaction value 
      //destructure the state and compare state.id === postId
      const existingPost = state.find(({id}) => id === postId)
      if (existingPost) {
        // does not mutate in creatSlice
        existingPost.reactions[reaction]++
      }
    },
  },
});
// Set state to use in component
export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
