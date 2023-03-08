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
      <h1 className="add-post">Add a new post</h1>
      <form className="form">
        <label className="form-lable" htmlFor="postTitle">Post title:</label>
        <input className="form-input"
          type="text"
          name="postTitle"
          value={title}
          id="postTitle"
          onChange={onTitleChange}
        />
        <label className="form-label" htmlFor="postContent">Post content:</label>
        <textarea className="form-input textarea"
          name="postContent"
          value={content}
          id="postContent"
          onChange={onContentChange}
        />
        <button className="btn" type="button" onClick={onPostAdd} >save post</button>
      </form>
    </section>
  );
}

export default AddPostForm