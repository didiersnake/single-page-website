import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import UserPage from "./features/users/UserPage";
import UserList from "./features/users/UserList";
import AddPostForm from "./features/post/AddPostForm";
import EditPostForm from "./features/post/EditPostForm";
import PostList from "./features/post/PostList";
import SinglePostPage from "./features/post/SinglePostPage";

function App() {
  return (
    /*     <section className="body-container" >
    <AddPostForm/>
    <PostList/>
    </section> */

    //Use routes
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />}/>
      </Route>
    </Routes>
  );
}

export default App;
