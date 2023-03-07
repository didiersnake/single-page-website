import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";

const PostList = () => {
    const posts = useSelector(selectAllPosts)
    
    const renderedPosts = posts.map((item) => {
        return <article key={item.id}>
            <h3>{ item.title}</h3>
            <p>{ item.content.substring(0, 100)}</p>
        </article>
    })

    return (
      <div>
        <h1>Posts</h1>
        {renderedPosts}
      </div>
    );
}

export default PostList;
