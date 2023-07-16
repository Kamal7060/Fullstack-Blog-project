import React, { useContext, useRef } from 'react';
import './login.css';
import { Context } from '../context/Context';
import { Login_Failure, Login_Start, Login_Success } from '../context/Action';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login= ({user})=>{
    user && window.location.replace('/');
    const data= useContext(Context);
    const uRef= useRef();
    const pRef= useRef();
    const loginHandler= (e)=>{
        e.preventDefault();
        const username= uRef.current.value;
        const password= pRef.current.value;
        const logFun= async ()=>{
            try{
                data.dispatch(Login_Start());
                const res= await axios.post('/auth/login', {
                    username,password
                });
                data.dispatch(Login_Success(res.data));
            }catch(err){
                data.dispatch(Login_Failure());
            }
        }
        logFun();
    }
    return <div className='login'>
        <img className= 'bgLoginImg' src= {require('./../Assets/loginPage.jpg')} alt= 'backgroundColor'/>
        <Link to= '/register' className='link'>
            <button className='regButton'>Register</button>
        </Link>
        <form className='loginFormStyle' onSubmit= {loginHandler}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor= 'uName' className='loginLabelStyle'>Username</label>
                <input ref= {uRef} id= 'uName' className= 'loginInputStyle' type= 'text'/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor= 'uPass' className='loginLabelStyle'>Password</label>
                <input ref= {pRef} id= 'uPass' className= 'loginInputStyle' type= 'password'/>
            </div>
            <button className='loginButton' type= 'submit' disabled={data.isFetching}>Login</button>
        </form>
    </div>
}

export default Login;