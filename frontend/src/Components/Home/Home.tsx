import React, { useState, useEffect, useCallback } from 'react';
// import {userJWT, userModeState} from '../context/GlobalState'
import './Home.css';
import TrackCard from '../TrackCard/TrackCard';

const Home = () => {

    // Api call for featured tracks
    
    return (
        
        <div className='container' id='main-container'>
            <img src="https://img.freepik.com/free-vector/music-studio-control-room-singer-booth_107791-1637.jpg?w=2000" className="img-fluid" alt="..." />
            <br /><br />
            <h3 className="text-decoration-underline">Featured Tracks</h3>
            <TrackCard />
        </div>);


}

export default Home;