import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom'

import Sidebar from './Components/Sidebar/Sidebar';

import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import CreateTrack from './Pages/CreateTrack';
import Navbar from './Components/Navbar/Navbar';




function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Sidebar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
          <Route path='/create-track' element={<CreateTrack />} />



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
      </Sidebar>
    </Router>
);
}

export default App;