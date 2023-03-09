import { selectAllUsers } from "../users/userSlice";
import { useSelector } from "react-redux";

// set author display for each post
// Add author component to postList Component 
function PostAuthor({ userId }) {
    const users = useSelector(selectAllUsers);
    //find author 
    const author = users.find(({ id }) => id === userId);
    console.log(author)
  return (
      <span >{ author ? author.name : "Guest" }</span>
  )
}

export default PostAuthor