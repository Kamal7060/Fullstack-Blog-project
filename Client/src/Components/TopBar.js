import React, { useContext } from 'react';
import './topBar.css';
import {Context} from '../context/Context';
import {Link} from 'react-router-dom';
import { LogOut } from '../context/Action';
const TopBar= ()=>{
    const PF= 'http://localhost:5000/images/';
    const {user, dispatch}= useContext(Context);
    const logoutHandler= ()=>{
        localStorage.removeItem('user');
        dispatch(LogOut());
    }
    return <div className='topBar'>
        <div className='topBarLeft'>
            <i className="leftIcons fab fa-facebook-square"></i>
            <i className="leftIcons fab fa-instagram-square"></i>
            <i className="leftIcons fab fa-pinterest-square"></i>
            <i className="leftIcons fab fa-twitter-square"></i>
        </div>
        <div className='topBarMiddle'>
            <ul className='middleList'>
                <li className='listItemStyle'><Link to= '/' className='link'>HOME</Link></li>
                <li className='listItemStyle'><Link to= {user?`/about/?user=${user.username}`:'/about/'} className= 'link'>ABOUT</Link></li>
                <li className='listItemStyle'>CONTACTS</li>
                <li className='listItemStyle'><Link to= '/write' className='link'>WRITE</Link></li>
                {user && <li className='listItemStyle' onClick={logoutHandler}>LOGOUT</li>}
            </ul>
        </div>
        <div className='topBarRight'>
            {
                user=== null?<>
                    <Link to= '/login' className= 'link'>
                    <span style={{marginRight:'15px', cursor: 'pointer', color: 'rgb(102, 102, 102)', fontSize: '22px'}}>LOGIN</span>
                    </Link>
                    <Link to= '/register' className= 'link'>
                    <span style={{marginRight:'10px', cursor: 'pointer', color: 'rgb(102, 102, 102)', fontSize: '22px'}}>REGISTER</span>
                    </Link>
                </>: 
                    (user.profilePic.length>0? 
                        <Link to= '/settings' className='link'>
                        <img className= 'rightImgStyle' src= {PF+user.profilePic} alt= 'profileImg'/>
                        </Link>
                        :<Link to= '/settings' className='link'>
                        <img className= 'rightImgStyle' src= {require('./../Assets/blank-profile.png')} alt= 'profileImg'/>
                        </Link>
                    )
            }
            <i className="rightIcons fas fa-search"></i>
        </div>
    </div>
}

export default TopBar;