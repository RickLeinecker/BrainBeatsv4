import React, { useState, useEffect, useCallback } from 'react';
// import {userJWT, userModeState} from '../context/GlobalState'
import './Home.css';
import TrackCard from '../TrackCard/TrackCard';

const Home = () => {

    // Api call for featured tracks
    
    return (
        <div className='container' id='main-container'>
            <TrackCard />
        </div>);


}

export default Home;