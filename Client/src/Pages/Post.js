import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import SideBar from '../Components/SideBar';
import './post.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Post= ()=>{
    const PF= 'http://localhost:5000/images/';
    const location= useLocation().pathname.split('/')[2];
    const {user}= useContext(Context);
    const [post, setPost]= useState({});
    useEffect(()=>{
        const postDataById= async ()=>{
            const postData= await axios.get(`/post/${location}`);
            setPost(postData.data);
        }
        postDataById();
    },[location]);

    const deletePostHandler= async ()=>{
        await axios.delete('/post/'+post._id, {data: {username: post.username}});
        window.location.replace('/');
    }
    return <div className='post'>
        <div className='postContent'>
            {post.photo && <img className= 'minPostImg' src= {PF+post.photo} alt= 'postImg'/>
            }
            <div className='postTitle'>
                <h1 style={{fontSize: '38px', display: 'inline'}}>{post.title}</h1>
                <span style={{visibility: `${user=== null ? 'hidden' : ((post.username=== user.username)?'visible':'hidden')}`}}>
                    <Link to= {`/write/?edit=${post._id}`}>
                        <i className="editIcon fas fa-edit"></i>
                    </Link>
                    <i onClick={deletePostHandler} className="deleteIcon fas fa-trash-alt"></i>
                </span>
            </div>
            <div className='postMetaInfo'>
                <p>
                <span>{`Author: `}</span>
                <Link to= {`/about/?user=${post.username}`} className= 'link'>
                    <span style= {{cursor: "pointer"}}><strong>{post.username}</strong></span>
                </Link>
                </p>
                <p>{new Date(post.createdAt).toDateString()}</p>
            </div>
            <p className='postDescStyle'>
                {post.desc}
            </p>
        </div>
        <SideBar/>
    </div>
}

export default Post;