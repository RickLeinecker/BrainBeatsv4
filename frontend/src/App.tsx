import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';

// import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        {/* <Route path='/Login' element={user ? <Navigate to='/' /> : <Login />}/>
        <Route path='/Record' element={<Record />} />
        <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Playlist' element={<Playlists />} />
        <Route path='/Playlist/:pid' element={<Playlist />} />
        <Route path='/Register' element={user ? <Home /> :<Register />} />
        <Route path='/Forgot' element={<Forgot />} />
        <Route path='/Test' element={<Test />} />
        <Route path='/About' element={<AboutUs />} /> */}
      </Routes>
    </Router>
);
}

export default App;