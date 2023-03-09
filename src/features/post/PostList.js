import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";


const PostList = () => {
  const posts = useSelector(selectAllPosts);

  // Arrange post view by latest date 
  const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPost.map((item) => {
    
    return (
      <article className="post-container" key={item.id}>
        <h3 className="post-title">{item.title}</h3>
        <p className="post-content">{item.content.substring(0, 100)}</p>
        <div>
          <PostAuthor userId={item.userId} />
          <TimeAgo timestamp={item.date}/>
        </div>
        <ReactionButtons post={item} />
      </article>
    );
  });

  return (
    <section className="post-section">
      <h1 className="blog-post">Posts</h1>
      {renderedPosts}
    </section>
  );
};

export default PostList;
