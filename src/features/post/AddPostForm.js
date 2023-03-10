import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { postAdded } from "./postSlice";
// now adding post direct Api
import { addPosts } from "./postSlice";

import React from "react";
import { selectAllUsers } from "../users/userSlice";

function AddPostForm() {
  // These are temporary states
  //(while waiting to be passed to slice )
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  // disable button if state empty
  //const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  // disble button if state empty and !resquestStatus idle
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle"

  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);

  // display available users from userSlice
  const userOption = allUsers.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onPostAdd = () => {
   /*  // if state exist add
    if (title && content && userId) {
      // Handle the stucture in slice using prepare callback makes it more abstract
      // only need to pass the data to function
      dispatch(addPosts(title, content, userId));
      //dispatch postAdded function
            dispatch(postAdded({
            id: nanoid(),
            title,
            content
            }))

      // clear states
      setContent("");
      setTitle("");
    } */

    // rewrite post added to send data api 
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        dispatch(addPosts({ title, body:content, userId})).unwrap()

        setContent("");
        setTitle("");
        setUserId("");
      } catch (error) {
        console.log("failed to save", error)
      }
      finally {
        setAddRequestStatus("idle")
      }
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
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChange}
        >
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
