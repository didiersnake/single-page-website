import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostError,
  getPostStatus,
} from "./postSlice";

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  /* 
  //Better practice remove dispatch, fetchPost and useEffect
  //Load the post in index.js as for Users.
  // Makes app faster
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
   */

  /*
   // Arrange post view by latest date
const orderedPost = posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

const renderedPosts = orderedPost.map((item) => {
  return (
    <article className="post-container" key={item.id}>
      <h3 className="post-title">{item.title}</h3>
      <p className="post-content">{item.content.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={item.userId} />
        <TimeAgo timestamp={item.date} />
      </div>
      <ReactionButtons post={item} />
    </article>
  );
}); 
*/
  
  //Abstract rendered post to PostExcerpt.js
  let content;
  if(postStatus === "loading") {
    content = <p>loading...</p>
  } else if (postStatus === "succeeded") {
    const orderedPost = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
      content = orderedPost.map((post) => {
      return <PostExcerpt post={post} key={post.id} />
    })
  } else if(postStatus === "rejected") {
    content = <p>{ postError }</p>
  }

    return (
      <section className="post-section">
        <h1 className="blog-post">Posts</h1>
        {content}
      </section>
    );
};

export default PostList;
