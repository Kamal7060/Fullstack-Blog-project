import React, { useRef, useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register= ({user})=>{
    user && window.location.replace('/');
    const uRef= useRef();
    const eRef= useRef();
    const pRef= useRef();
    const [error, setError]= useState(false);
    const submitHandler= async (e)=>{
        e.preventDefault();
        setError(false);
        const username= uRef.current.value;
        const email= eRef.current.value;
        const password= pRef.current.value;
        try{
            const user= await axios.post('/auth/register', {
                username,email,password
            }) 
            user.data && window.location.replace('/login');
        }catch(err){
            setError(true);
        }
    }

    return <div className='register'>
        <img className= 'bgImg' src= {require('./../Assets/registerPage.jpg')} alt= 'backgroundColor'/>
        <Link to= '/login' className='link'>
            <button className='loginRegisterButton'>Login</button>
        </Link>
        <form className='registerFormStyle' onSubmit={submitHandler}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor= 'uName' className='registerLabelStyle'>Username</label>
                <input ref= {uRef} id= 'uName' className= 'registerInputStyle' type= 'text'/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor= 'uEmail' className='registerLabelStyle'>Email Id</label>
                <input ref= {eRef} id= 'uEmail' className= 'registerInputStyle' type= 'text'/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor= 'uPass' className='registerLabelStyle'>Password</label>
                <input ref= {pRef} id= 'uPass' className= 'registerInputStyle' type= 'password'/>
            </div>
            <button className='registerRegisterButton' type= 'submit'>Register</button>
            {error && <p style= {{marginTop: '10px', color: 'white'}}>Something went wrong</p>}
        </form>
    </div>
}

export default Register;