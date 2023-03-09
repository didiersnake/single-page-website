import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

 const reactionEmoji = {
   thumbsUp: "👍",
   wow: "😮",
   heart: "💖",
   rocket: "🚀",
   coffee: "☕",
 };

function ReactionButtons({ post }) {
    const dispatch = useDispatch();
    
    // convert object to array and map
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name}
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
                type="button"
            >
                {emoji} {post.reactions[name]}
           </button>
       )
   }) 
    return <div>{reactionButtons}</div>;
}

export default ReactionButtons