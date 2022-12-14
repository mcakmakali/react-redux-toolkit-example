import React, { useEffect} from "react";  
import  { useDispatch, useSelector } from "react-redux";
import  { Link } from 'react-router-dom';
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons"
import { selectAllPost, fetchPosts } from "./postsSlice";


export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPost);
    const error = useSelector(state =>state.posts.error);

    const postStatus = useSelector(state =>state.posts.status);
    useEffect(() => {
        if(postStatus === "idle"){
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])


    
    let content 
    if(postStatus === "loading"){
        content = <div className="loader">Loading...</div>
    }else if(postStatus === "succeeded"){
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <div>
                    <PostAuthor userId={post.user}/>
                    <TimeAgo timestamp={post.date}/>
                   
                </div>
                <p>{post.content.substring(0,100)}</p>
                <ReactionButtons post={post} />
                <Link to={`/post/${post.id}`} className="button muted-button">View Post</Link>
            </article>
        ))
    }

    return(
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );


}