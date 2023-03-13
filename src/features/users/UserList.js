import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";
import { Link } from "react-router-dom";

function UserList() {
  const users = useSelector(selectAllUsers);
  
  const allUsers = users.map((user) => {
    return (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
      )
  });
    
  return (
    <section>
      <h2>User</h2>
      <ul>{allUsers}</ul>
    </section>
  );
}

export default UserList;
