import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './write.css';
import axios from "axios";

const Write = ({ user }) => {
    (user === null) && window.location.replace('/register');
    const PF= 'http://localhost:5000/images/';
    const location = useLocation();
    const postID = location.search.split('=')[1]; // /write/edit = postId
    const tRef = useRef();
    const dRef = useRef();
    const [file, setFile] = useState(null);
    const [url, setURL]= useState("");
    const [wErr, setWerr] = useState(false);
    useEffect(() => {
        if(postID!== undefined){
            const postDataById= async ()=>{
                let postData;
                try{postData= await axios.get(`/post/${postID}`);}catch(err){console.log("kamal")};
                tRef.current.value= postData.data.title;
                dRef.current.textContent= postData.data.desc;
                setURL(PF+postData.data.photo);
            }
            postDataById();
        }
    }, [postID]);    //if temp defined then send get request
    const writeSubmitHandler = async (e) => {
        e.preventDefault();
        setWerr(false);
        const nwData = {
            title: tRef.current.value,
            desc: dRef.current.textContent,
            username: user.username
        }
        if (file) {
            const nwForm = new FormData();
            const filename = Date.now().toString() + "_" + Math.random().toString() + "_" + file.name;
            nwForm.append('name', filename);
            nwForm.append('file', file);
            nwData.photo = filename;
            try {
                await axios.post("/upload", nwForm);
            } catch (err) {
                setWerr(true);
                return;
            }
        }
        try {
            let res;
            if(postID!== undefined)
                res= await axios.put(`/post/${postID}`, nwData);
            else
                res = await axios.post("post/", nwData);
            window.location.replace('/post/' + res.data._id);
        }
        catch (err) {
            console.log(err);
            setWerr(true);
        }
    }

    return <div className='write'>
        {wErr && <p style={{ color: 'red', marginBottom: '13px' }}>Something went wrong</p>}
        {(file || (postID!== undefined)) && <img className='writeImgStyle' src={postID!== undefined? url : URL.createObjectURL(file)} alt='postImg' />}
        <form className='writeFormStyle' onSubmit={writeSubmitHandler}>
            <div className='writeHeaderStyle'>
                <div className='writeImgTitleStyle'>
                    <label className='addIconStyle' htmlFor='writeImg'><i className="fas fa-plus"></i></label>
                    <input onChange={e => setFile(e.target.files[0])} type='file' id='writeImg' style={{ display: 'none' }} />
                    <input ref={tRef} className='writeTitle' autoFocus placeholder='Title For Your Post' type='text' />
                </div>
                <button className='publishButtonStyle' type='submit'>{postID!== undefined ? 'Update': 'Publish'}</button>
            </div>
            <span ref={dRef} className='writeDescStyle' type='text' contentEditable></span>
        </form>
    </div>
}

export default Write;