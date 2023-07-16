import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

const SideBar= ()=>{
    const [cats, setCats]= useState([]);
    useEffect(()=>{
        const fetchCats= async ()=>{
            const catArray= await axios.get('/cat/');
            setCats(catArray.data);
        }
        fetchCats();
    },[]);
    return <div className= 'sideBar'>
        <p className='sideBarTitleStyle'>ABOUT</p>
        <img className= 'sideBarImg' src= {require('./../Assets/sideBarImg.jpg')} alt= 'sideBatImg'/>
        <p className='sideBarTextStyle'>Java is a general-purpose, class-based, object-oriented programming language
         designed for having lesser implementation dependencies. It is a computing platform
         for application development.</p>
        <p className='sideBarTitleStyle'>CATEGORIES</p>
        <ul className='sideBarListStyle'>
            {cats.map(c=>
                <Link key= {c._id} className={`sideBarListItemStyle link`} to= '/?cat=c.name'>
                    <li>{c.name}</li>
                </Link>
            )}
        </ul>
        <p className='sideBarTitleStyle'>FOLLOW US</p>
        <div className='followIcons'>
            <i className="followIcon fab fa-facebook-square"></i>
            <i className="followIcon fab fa-instagram-square"></i>
            <i className="followIcon fab fa-pinterest-square"></i>
            <i className="followIcon fab fa-twitter-square"></i>
        </div>
    </div>
}

export default SideBar;