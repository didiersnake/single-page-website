import React from "react";
/* import AddPostForm from "./features/post/AddPostForm";
import PostList from "./features/post/PostList"; */

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/post/AddPostForm";
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
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
