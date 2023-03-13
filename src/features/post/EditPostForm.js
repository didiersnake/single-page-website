import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectPostById, update } from "./postSlice";

function EditPostForm() {
  const navigate = useNavigate();
  // get postId to edith
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  if (!post) {
    return (
      <div>
        <h2>Page not found</h2>
      </div>
    );
  }

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  // display available users from userSlice
  const userOption = allUsers.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onPostEdit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(update({ id:post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

        setContent("");
        setTitle("");
        setUserId("");
        navigate(`/post/${post.id}`)
      } catch (error) {
        console.log("failed to save post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const onPostDelete = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(update({ id:post.id })).unwrap();

        setContent("");
        setTitle("");
        setUserId("");
        console.log("deleted")
        navigate("/")
      } catch (error) {
        console.log("failed to delete post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h1 className="add-post">Edit post</h1>
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
          //value becomes default value when editing
          defaultValue={userId}
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
          onClick={onPostEdit}
        >
          Save
        </button>
        <button
          className="btn"
          type="button"
          onClick={onPostDelete}
        >
          Delete
        </button>
      </form>
    </section>
  );
}

export default EditPostForm;
