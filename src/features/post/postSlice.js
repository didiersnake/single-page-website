import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  post: [],
  status: "idle", // idle | loading | succeed | fail
  error: null,
  count: 0
};

//fetch
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  //Request data
  const response = await axios.get(POST_URL);
  return [...response.data];
});

//post
export const addPosts = createAsyncThunk(
  "posts/addPosts",
  async (initialPost) => {
    //add data (initialPost)
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

//update
export const update = createAsyncThunk(
  "posts/updatePosts",
  async (initialPost) => {
    //add data (initialPost)
    const { id } = initialPost;
    const response = await axios.put(`${POST_URL}/${id}`, initialPost);
    return response.data;
  }
);

// delete post 
export const deletePosts = createAsyncThunk("posts/deletePosts", async (initialPost) => {
  const { id } = initialPost;
  const response = await axios.delete(`${POST_URL}/${id}`, initialPost);
  if (response?.status === 200) return initialPost;
  return `${response?.status} : ${response?.statusText}`;
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Not used
/*     postAdded: {
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
 */
    
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      //if post exist increment the reaction value
      //destructure the state and compare state.post.id === postId
      const existingPost = state.post.find(({ id }) => id === postId);
      if (existingPost) {
        // does not mutate in creatSlice
        existingPost.reactions[reaction]++;
      }
    },

    increaseCount(state, action) {
      state.count = state.count + 1
    }
  },
  extraReducers(builder) {
    builder
      /* fetch post extra reducers */
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
        state.status = "rejected";
        state.error = action.error.message;
      })

      /* Add post extra reducers */
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

      /* Update post extra reducers */
      .addCase(update.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not be completed");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        // (filter out previous post with same id)
        const posts = state.post.filter((post) => post.id !== id);
        state.post = [...posts, action.payload];
      })
      
      /* delete post extra reducers */
      .addCase(deletePosts.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Could not delete Post");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // (filter out deleted post )
        const posts = state.post.filter((post) => post.id !== id);
        state.post = posts;
      });
  },
});

// Set state to use in component
export const selectAllPosts = (state) => state.posts.post;
export const getPostError = (state) => state.posts.error;
export const getPostStatus = (state) => state.posts.status;
export const getCount = (state) => state.posts.count;

export const selectPostById = (state, postId) => {
  return state.posts.post.find((post) => post.id === postId);
};

export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
