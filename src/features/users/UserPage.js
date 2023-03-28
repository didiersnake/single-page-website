import React from 'react'
import { selectUserById } from './userSlice'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPostByUser } from '../post/postSlice'

function UserPage() {
    //get user
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)))
    
    /* 
    //Fetch all post posted by a user
    const postForUser = useSelector((state) => {
        const allPost = selectAllPosts(state)
        return allPost.filter( post => post.userId === Number(userId))
    }) 
    */
    
    // managing performance rewrite postForUser with memorize selector
    // It runs only on dependency fxn changed
    const postForUser = useSelector(state => selectPostByUser(state, Number(userId)))

    //get Post titles 
    const postTitles = postForUser.map((post) => {
        return (
            <li key={post.id}>
                <Link to={`/post/${post.id}`}>{ post.title }</Link>
            </li>
        )
    })

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>{ postTitles }</ol>
        </section>
    )
}

export default UserPage