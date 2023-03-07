import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postSlice";
import React from 'react'

function AddPostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChange  = (e)=> setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)

    const dispatch = useDispatch();
    
    const onPostAdd = () => {
        // if state exist add 
        if (title && content) {
          // Handle the stucture in slice using prepare callback makes it more abstract
          // only need to pass the data to function
          dispatch(postAdded(title, content));

          /* //dispatch postAdded function
            dispatch(postAdded({
            id: nanoid(),
            title,
            content
            })) */

          // clear states
          setContent("");
          setTitle("");
        }
    }

  return (
    <section>
      <h1>Add a new post</h1>
      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          name="postTitle"
          value={title}
          id="postTitle"
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post content:</label>
        <textarea
          name="postContent"
          value={content}
          id="postContent"
          onChange={onContentChange}
        />
        <button type="button" onClick={onPostAdd} >save post</button>
      </form>
    </section>
  );
}

export default AddPostForm