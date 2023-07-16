import React, { useEffect, useState } from 'react';
import './home.css';
import SideBar from './../Components/SideBar';
import PostsContainer from './../Components/PostContainer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home= ()=>{
    const {search}= useLocation();
    const [posts, setPosts]= useState([]);
    useEffect(()=>{
        const fetchedPosts= async ()=>{
            const res= await axios.get(`post/${search}`);
            setPosts(res.data);
        }
        fetchedPosts();
    },[search]);
    return <div className= 'home'>
        <div className='homeTitle'>
            <p style={{marginLeft: '25px', fontSize: '20px'}}>React & Node</p>
            <h1 style={{fontSize: '55px', textShadow: '0 0 5px white'}}>BLOG</h1>
        </div>
        <img className= 'homeImg' src= {require('./../Assets/homeBlogImg.webp')} alt= 'BlogImg'/>
        <div className='homeBottom'>
            <PostsContainer posts= {posts}/>
            <SideBar/>
        </div>
    </div>
}

export default Home;