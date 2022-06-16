import React, { useState, useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { CardList } from './CardList';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './homepage.css';
import { AuthContext } from '../context/AuthContext';

const Cards = () => {
    //midi data which is a sting
    const [data, setData] = useState('');
    //boolean for botton nav
    const [showMedia, setShowMedia] = useState(false);
    const { user } = useContext(AuthContext);
    //Load data to be sent to MidiPlayer
    let _data = atob(data);

    return (
        <>
            <div style={{overflowX: 'hidden'}}>
                <div className='row'>
                    <Container className='containerOverflow'>
                        <div style={{ display: 'inline-flex' }}>
                            {CardList.map((item, index) => {
                                return (
                                    <Card key={index} className='cardStyle'>
                                        <Card.Img variant="top" className='cardImage' src='https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png' />
                                        <Card.Body className='overlay'>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Subtitle>{item.artist}</Card.Subtitle>
                                            <Button className='cardButton' variant="primary"><FaHeart /></Button>
                                            <Button className='cardButton' onClick={() => { setData(item.data); setShowMedia(true) }}><FaPlayCircle /></Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </div>
                    </Container>
                </div>
                <div className='row'>
                    {//Only appears if user is signed in
                        user ?
                            <>
                                <div> YOUR SONG </div>
                                <Container  className='containerOverflow'>
                                    <div style={{ display: 'inline-flex' }}>
                                        {CardList.map((item, index) => {
                                            return (
                                                <Card key={index} className='cardStyle'>
                                                    <Card.Img variant="top" className='cardImage' src='https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png' />
                                                    <Card.Body className='overlay'>
                                                        <Card.Title style={{color: 'white'}}>{item.title}</Card.Title>
                                                        <Card.Subtitle style={{color: 'white'}}>{item.artist}</Card.Subtitle>
                                                        <Button className='cardButton' variant="primary"><FaHeart /></Button>
                                                        <Button className='cardButton' onClick={() => { setData(item.data); setShowMedia(true) }}><FaPlayCircle /></Button>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </Container> </> : <></>}
                </div>
                <div className='row' style={{height: '50px'}}>
                    <div className={`${showMedia ? 'mediaPlayerAct' : 'mediaPlayer'}`}>
                        <div>
                            <MidiPlayer data={_data} loop={0} onStop={() => setShowMedia(false)} onEnd={() => setShowMedia(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards