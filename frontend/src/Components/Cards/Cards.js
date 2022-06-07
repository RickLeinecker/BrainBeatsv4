import React, { useState, useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { CardList } from './CardList';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './MiniPlayer.css';
import { AuthContext } from '../context/AuthContext';

const Cards = () => {
    const [data, setData] = useState('');
    const [showMedia, setShowMedia] = useState(false);
    const {user} = useContext(AuthContext);
    //Load data to be sent to MidiPlayer
    let _data = atob(data);

    const handleDefault = (e) =>{
        e.preventDefault();
        console.log(user);
    }

    return (
        <>
            <button onClick={handleDefault}>HI</button>
            <Container style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                <div style={{ display: 'inline-flex' }}>
                    {CardList.map((item, index) => {
                        return (
                            <Card key={index} style={{ display: 'block', width: '250px', height: '200px', borderRadius: '15px', margin: '10px' }}>
                                <Card.Img variant="top" className='image' src='https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png' />
                                <Card.Body className='overlay'>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle>{item.artist}</Card.Subtitle>
                                    <Button variant="primary"><FaHeart /></Button>
                                    <Button onClick={() => { setData(item.data); setShowMedia(true)}}><FaPlayCircle /></Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </Container>
            <div className={`${showMedia ? 'mediaPlayerAct':'mediaPlayer' }`}>
                <div>
                <MidiPlayer data={_data} loop={false} autoplay={true}/>
                </div>
            </div>

        </>
    )
}

export default Cards