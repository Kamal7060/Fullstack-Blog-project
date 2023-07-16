import React from 'react';
import './postContainer.css';
import MinPostView from './MinPostView';

const PostContainer= ({posts})=>{
    return <div className='postContainer'>
        {posts.map((post)=>{
            return <MinPostView key= {post._id} post= {post}/>
        })}
    </div>
}

export default PostContainer;