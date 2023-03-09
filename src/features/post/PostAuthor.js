import { users } from "../users/userSlice";
import { useSelector } from "react-redux";

// set author display for each post
// Add author component to postList Component 
function PostAuthor({ userId }) {
    const allUsers = useSelector(users)
    //find author 
    const author = allUsers.find( user => user.id === userId );

  return (
      <span >{ author ? author.name : "Guest" }</span>
  )
}

export default PostAuthor