import React from "react";
import AddPostForm from "./features/post/AddPostForm";
import PostList from "./features/post/PostList";

function App() {
  
  return (
    <section className="body-container" >
    <AddPostForm/>
    <PostList/>
    </section>
  );
}

export default App;
