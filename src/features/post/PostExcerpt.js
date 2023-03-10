import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import React from 'react'

// combines post component into one
function PostExcerpt({post}) {
  return (
    <article className="post-container" >
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.body.substring(0, 100)}...</p>
      <div>
        <Link to={`post/${post.id}`}>View post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostExcerpt