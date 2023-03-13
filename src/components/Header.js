import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { increaseCount, getCount } from '../features/post/postSlice';
function Header() {

const dispatch = useDispatch();
const count = useSelector(getCount);

  return (
    <header>
      <h1>Redux blog</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"post"}>Post</Link>
          </li>
          <li>
            <Link to={"user"}>Users</Link>
          </li>
          <button onClick={() => dispatch(increaseCount())}>{count}</button>
        </ul>
      </nav>
    </header>
  );
}

export default Header