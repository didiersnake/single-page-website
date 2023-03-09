import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import React from "react";
import { users } from "../users/userSlice";

function AddPostForm() {
  // These are temporary states
  //(while waiting to be passed to slice and stored in store )
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const dispatch = useDispatch();
  const allUsers = useSelector(users)

// display available users from userSlice 
  const userOption = allUsers.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  // disable button if state empty
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const onPostAdd = () => {
    // if state exist add
    if (title && content && userId) {
      // Handle the stucture in slice using prepare callback makes it more abstract
      // only need to pass the data to function
      dispatch(postAdded(title, content, userId));
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
  };

  return (
    <section>
      <h1 className="add-post">Add a new post</h1>
      <form className="form">
        <label className="form-lable" htmlFor="postTitle">
          Post title:
        </label>
        <input
          className="form-input"
          type="text"
          name="postTitle"
          value={title}
          id="postTitle"
          onChange={onTitleChange}
        />
        
        <label className="form-lable" htmlFor="postAuthor">
          Author
        </label>
        <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOption}
        </select>

        <label className="form-label" htmlFor="postContent">
          Post content:
        </label>
        <textarea
          className="form-input textarea"
          name="postContent"
          value={content}
          id="postContent"
          onChange={onContentChange}
        />

        <button
          disabled={!canSave}
          className="btn"
          type="button"
          onClick={onPostAdd}
        >
          save post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
