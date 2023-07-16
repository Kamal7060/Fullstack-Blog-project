import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostContainer from '../Components/PostContainer';
import './about.css';

const About= ()=>{
    const username= useLocation().search;
    (username.length=== 0) && window.location.replace('/register');
    const PF= 'http://localhost:5000/images/';
    const [user, setUser]= useState({});
    const [posts, setPost]= useState([]);
    useEffect(()=>{
        const postInfoFun= async ()=>{
            const postInfo= await axios.get(`/post/${username}`);
            setPost(postInfo.data);
        }
        postInfoFun();
    },[username]);
    useEffect(()=>{
        const userInfoFun= async ()=>{
            const userInfo= await axios.get(`/user/${username}`);
            setUser(userInfo.data[0]);
        }
        userInfoFun();
    },[username]);
    return <div className='about'>
        <div className='infoBar'>
            {user.profilePic?
                <img className= 'aboutProImg' src= {PF+user.profilePic} alt= 'yourProfileImg'/>
                :<img className= 'aboutProImg' src= {require('./../Assets/blank-profile.png')} alt= 'yourProfileImg'/>
            }
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
        <div className='postBar'>
            <PostContainer posts= {posts}/>
        </div>
    </div>
}

export default About;