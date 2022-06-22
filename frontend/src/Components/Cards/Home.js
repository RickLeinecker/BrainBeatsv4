import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { CardList } from './CardList';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './homepage.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';

const Cards = () => {
    //post array
    const [post, setPost] = useState();
    //midi data which is a sting
    const [data, setData] = useState('');
    //boolean for botton nav
    const [showMedia, setShowMedia] = useState(false);
    const { user } = useContext(AuthContext);
    //Load data to be sent to MidiPlayer
    let _data = atob(data);

    const path = require('../Path');

    // useEffect(() => {
    //     let config = {
    //         method: 'get',
    //         url: path.buildPath('/users/getAllUsersPosts'),
    //     }
    //     axios(config)
    //         .then((response) => {
    //             setPost(response.data);
    //         })
    // })

    const endPlay = () => {
        setData('');
        setShowMedia(false);


    }
    return (
        <>
        {//if user is logged in dont display carousel
        !user ? <div style={{width: '50%', marginLeft: '25%'}}>
                <Carousel />
            </div> : <></>
        }
            
            <h1>RECENT SONGS</h1>
            <div style={{ overflowX: 'hidden' }}>
                <div className='row'>
                    <Container className='containerOverflow'>
                        <div style={{ display: 'inline-flex' }}>
                            {CardList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Card className='cardStyle'>
                                            <Card.Img variant="top" className='playhover' src='https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png' />
                                            <Card.Body>

                                                <Card.Title className='cardText'>{item.title}</Card.Title>
                                                <Card.Subtitle className='cardText'>{item.artist}</Card.Subtitle>
                                                <button className='cardPlayButton' onClick={(e) => {
                                                    e.preventDefault();
                                                    setData(item.data); //store this items midi string to Data
                                                    setShowMedia(true); //reveal midi player
                                                }}><FaPlayCircle size={90}/></button>

                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </Container>
                </div>
                <div className='row'>
                    {//Only appears if user is signed in
                        user ?
                            <>
                                <h1> YOUR SONG </h1>
                                <Container className='containerOverflow'>
                                    <div style={{ display: 'inline-flex' }}>
                                        {CardList.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <Card className='cardStyle'>
                                                        <Card.Img variant="top" className='playhover' src='https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png' />
                                                        <Card.Body>

                                                            <Card.Title className='cardText'>{item.title}</Card.Title>
                                                            <Card.Subtitle className='cardText'>{item.artist}</Card.Subtitle>
                                                            <button className='cardPlayButton' onClick={(e) => {
                                                                e.preventDefault();
                                                                setData(item.data); //store this items midi string to Data
                                                                setShowMedia(true); //reveal midi player
                                                            }}><FaPlayCircle size={90}/></button>

                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Container> </> : <></>}
                </div>
                <div className='row' style={{ height: '50px' }}>
                    <div className={`${showMedia ? 'mediaPlayerAct' : 'mediaPlayer'}`}>
                        <div>
                            <MidiPlayer data={_data} autoplay onEnd={endPlay} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards