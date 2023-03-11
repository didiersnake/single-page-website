import { selectPostById } from './postSlice';
import { useSelector } from 'react-redux';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import PostAuthor from './PostAuthor';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function SinglePostPage() {
    //Retrieve postId
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }
  return (
    <article className="post-container">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.body.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      </div>
      <ReactionButtons post={post} />
    </article>
  );
}

export default SinglePostPage