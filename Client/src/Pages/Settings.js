import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../Components/SideBar';
import { Update_Failure, Update_Start, Update_Success } from '../context/Action';
import './settings.css';
import axios from 'axios';

const Settings= ({user, dispatch})=>{
    (user=== null) && window.location.replace('/register');
    const PF= 'http://localhost:5000/images/';
    const uRef= useRef();
    const eRef= useRef();
    const pRef= useRef();
    const [file,setFile]= useState(null);

    useEffect(()=>{
        uRef.current.value= user.username;
        eRef.current.value= user.email;
    },[user]);

    const updateHandler= async (e)=>{
        e.preventDefault();
        dispatch(Update_Start());
        const updateUser= {
            userId: user._id,
            username: uRef.current.value,
            email: eRef.current.value,
            password: pRef.current.value
        }
        if(file){
            const nwForm= new FormData();
            const filename= Date.now().toString()+"_"+Math.random().toString()+"_"+file.name;
            nwForm.append('name', filename);
            nwForm.append('file', file);
            updateUser.profilePic= filename;
            try{
                await axios.post("/upload", nwForm);
            }catch(err){
                dispatch(Update_Failure());
                return;
            }
        }
        try{
            const res= await axios.put("/user/"+user._id, updateUser);
            console.log(res);
            dispatch(Update_Success(res.data));
        }
        catch(err){
            dispatch(Update_Failure());
        }
    }
    const deleteUserHandler= async()=>{
        dispatch(Update_Start());
        try{
            await axios.delete('/user/'+user._id, {data: {userId: user._id}});
            localStorage.removeItem('user');
            dispatch(Update_Success(null));
        }
        catch(err){
            console.log(err);
            dispatch(Update_Failure());
        }
    }
    return <div className= 'settings'>
        <div className= 'leftSettings'>
            <div className='header'>
                <span style= {{fontSize: '25px', color: 'teal', cursor: 'pointer'}}>Update Account</span>
                <span onClick={deleteUserHandler} style= {{fontSize: '15px', color: 'tomato', cursor: 'pointer'}}>Delete Account</span>
            </div>
            <form className='formStyle' onSubmit= {updateHandler}>
                <div className='divPic'>
                    <p className= 'proPicTitle'><strong>Profile Picture</strong></p>
                    {file!== null ?
                        <img className= 'profileImg' src={URL.createObjectURL(file)} alt= 'profileImg'/>:(
                        user.profilePic.length>0?
                        <img className= 'profileImg' src={PF+user.profilePic} alt= 'profileImg'/>:
                        <img className= 'profileImg' src= {require('./../Assets/blank-profile.png')} alt= 'profileImg'/>
                    )}
                    <label className= 'profilePick' htmlFor= 'profile'><i className="fas fa-camera"></i></label>
                    <input onChange={e=>setFile(e.target.files[0])} id= 'profile' type= 'file' style= {{display: 'none'}}/>
                </div>
                <div className= 'divInput'>
                    <label className= 'labelStyle' htmlFor= 'name'><strong>Username</strong></label>
                    <input ref= {uRef} className= 'inputField' type= 'text' id= 'name'/>
                    <label className= 'labelStyle' htmlFor= 'email'><strong>Email</strong></label>
                    <input ref= {eRef} className= 'inputField' type= 'email' id= 'email'/>
                    <label className= 'labelStyle' htmlFor= 'password'><strong>Password</strong></label>
                    <input ref={pRef} className= 'inputField' placeholder= 'Enter password' type= 'password' id= 'password'/>
                    <button className='settingButton' type= 'submit'>Update</button>
                </div>
            </form>
        </div>
        <SideBar/>
    </div>
}

export default Settings;