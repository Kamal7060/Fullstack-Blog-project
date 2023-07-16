import React, { useContext } from 'react';
import TopBar from './Components/TopBar';
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Post from './Pages/Post';
import Register from './Pages/Register';
import Settings from './Pages/Settings';
import Write from './Pages/Write';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Context } from './context/Context';

//about profile pic
//settings profile pic
//topbar profile pic
//sidebarimg

const App= ()=>{
  const {user, dispatch}= useContext(Context);
  return <Router>
      <TopBar/>
      <Routes>
        <Route exact path= '/' element= {<Home/>}/>
        <Route path= '/settings' element= {<Settings dispatch= {dispatch}user= {user}/>}/>
        <Route path= '/about/' element= {<About/>}/>
        <Route path= '/post/:id' element= {<Post/>}/>
        <Route path= '/write' element= {<Write user= {user}/>}/>
        <Route path= '/login' element= {<Login user= {user}/>}/>
        <Route path= '/register' element= {<Register user= {user}/>}/>
      </Routes>
    </Router>
}

export default App;