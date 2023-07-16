import React from 'react';
import { Link } from 'react-router-dom';
import './minPostView.css';

const MinPostView= ({post})=>{
    const PF= 'http://localhost:5000/images/';
    return <div className='minPostView'>
        {post.photo && <img className= 'minPostImg' src= {PF+post.photo} alt= 'postImg'/>
        }
        {post.categories.length>0 && 
            <div className='minPostCat'>
                {post.categories.map(cat=>{
                    return <Link key= {Math.random().toString()}className= 'link' to= '/?cat=c.name'>
                        <span>{cat}</span>
                    </Link>
                })}
            </div>
        }
        <Link to= {`/post/${post._id}`} className= 'link'>
            <p className='minPostTitle'>{post.title}</p>
        </Link>
        <p>{new Date(post.createdAt).toDateString()}</p>
        <p className='minPostText'>{post.desc}</p>
    </div>
}

export default MinPostView;