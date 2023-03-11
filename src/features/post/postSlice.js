import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";


const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = 
  {
    post: [],
    status: "idle", // idle | loading | succeed | fail 
    error: null
  }

  //fetch data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  //Request data 
  const response = await axios.get(POST_URL)
  return [...response.data]
})

//post data 
export const addPosts = createAsyncThunk('posts/addPosts', async (initialPost) => {
  //add data (initialPost) 
  const response = await axios.post(POST_URL, initialPost)
  return response.data
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // normally not the xorrext way but here immer js manages it
        // it works only in creatSlice
        state.post.push(action.payload);
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
      //destructure the state and compare state.post.id === postId
      const existingPost = state.post.find(({id}) => id === postId)
      if (existingPost) {
        // does not mutate in creatSlice
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //Add date and reactions to post
        let min = 1;
        const loadedPost = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //Add fetched post to post []
        state.post = state.post.concat(loadedPost);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        //Post newpost to post []
        state.post.push(action.payload);
      })
  }
});

// Set state to use in component
export const selectAllPosts = (state) => state.posts.post;
export const getPostError = (state) => state.posts.error;
export const getPostStatus = (state) => state.posts.status;

export const selectPostById = (state, postId)=> {
  return state.posts.post.find(post => post.id === postId);
}

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
