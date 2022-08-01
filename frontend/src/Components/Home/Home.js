import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FaHeart, FaPlayCircle, FaRegHeart, FaTrash, FaTruck } from 'react-icons/fa';
import Logo from '../Navbar/Logo.jpg'
import './homepage.css';
import Carousel from '../Carousel/Carousel';
import { useRecoilValue } from 'recoil';

import {userJWT, userModeState} from '../context/GlobalState'
import sendAPI from '../sendAPI';

import {playMidiFile} from '../Record/Playback.js'

const Cards = () => {
    //post array
    const [allPost, setAllPost] = useState([]);
    const [userPost, setUserPost] = useState([]);
    const [log, setLog] = useState();
    //midi data which is a sting
    const [data, setData] = useState('');
    //boolean for botton nav
    const [showMedia, setShowMedia] = useState(false);
    const [beTheFirst, setBeTheFirst] = useState('');
    const [yourFirst, setYourFirst] = useState('');
    const user = useRecoilValue(userModeState)
    const jwt = useRecoilValue(userJWT);

    const [liked, setLiked] = useState([]);

    useEffect(() => {
        //always run this api for homepage
            getAllSong()
        //only run this api if user is logged in
        if(user){
            getUserPostInfo()
        }
    }, [])

    const getAllSong = () => {
        sendAPI('get', '/posts/getAllPosts')
            .then((res) => {
                setAllPost(res.data);
            })
    }
    const getUserPostInfo = () => {
        const dataBody = {
            'userID': user.id,
        }
        sendAPI('get', '/posts/getUserPostsByID', dataBody)
            .then((res) => {
                setUserPost(res.data);
                setLog(res);
            })
            .catch((err) => {
                setLog(err);
            })
            
        sendAPI('get', '/likes/getAllUserLikes', dataBody)
            .then((res) => {
                setLiked(res.data);
            })
    }
    const onLike = useCallback((post) => {
        let bodyData = {
            userID: user.id,
            postID: post,
            token: jwt,
        }
        sendAPI('post', '/likes/createUserLike', bodyData)
        .then((res) => {
            setLiked((l) => [... l,res.data])
        })
        .catch((err) => {
            console.log(err.data)
        })
    },[])

    const onRemove = useCallback((post) => {
        let bodyData = {
            userID: user.id,
            postID: post,
            token: jwt,
        }
        sendAPI('delete', '/likes/removeUserLike', bodyData)
        .then((res) => {
            setLiked((l) => l.filter((p) => p.postID !== post))})
        .catch((err) => {
            console.log(err.data)
        })
 
    },[])

    const onRemovePost = useCallback((post) => {
        let bodyData = {
            id: post,
            token: jwt,
        }
        sendAPI('delete', '/posts/deletePost', bodyData)
        .then((res) => {
            getAllSong()
            getUserPostInfo()
        })
        .catch((err) => {
            console.log(err.data)
        })
 
    },[])

    const playSong =(midi, instruments, noteTypes, bpm) => {
        playMidiFile(midi, instruments, noteTypes, bpm);
    }
    return (
        <>
        <div className={user ? 'mainHomebodyUser': 'mainHomeBody'}>
                {//if user is logged in dont display carousel
                !user ? <div style={{}}>
                <Carousel />
            </div> : <></>
        }
        <h1>RECENT SONGS</h1>
        
        <div style={{ overflowX: 'hidden' }}>
            <div className='row'>
                <Container className='containerOverflow'>
                    <div style={{ display: 'inline-flex' }}>
                        <p>{beTheFirst}</p>
                        {allPost.map((item, index) => {
                            return (
                                <div key={index}>
                                    
                                    <Card className='cardStyle'>
                                        <Card.Img variant="top" className='playhover cardImg' src={item.thumbnail ? item.thumbnail : Logo} />
                                        <Card.Body>

                                            <Card.Title className='cardText'>{item.title}</Card.Title>
                                            <Card.Subtitle className='cardText'>{item.user.username}</Card.Subtitle>
                                            <button className='homePlayButton' onClick={(e) => {
                                                e.preventDefault();
                                                playSong(item.midi, item.instruments, item.noteTypes, item.bpm)
                                                
                                            }}><FaPlayCircle size={90} /></button>
                                            <button className='cardHeart'>
                                                {liked.filter((like) => like.postID === item.id).length ? <FaHeart onClick={()=>onRemove(item.id)}/> : <FaRegHeart onClick={() => onLike(item.id)}/>}
                                            </button>
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
                    user ? <>
                    <h1> YOUR SONG </h1>
                    <Container className='containerOverflow'>
                        <div style={{ display: 'inline-flex' }}>
                            <p>{yourFirst}</p>
                            {userPost.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Card className='cardStyle'>
                                            <Card.Img variant="top" className='playhover cardImg'  src={item.thumbnail ? item.thumbnail : Logo}/>
                                            <Card.Body>
        
                                                <Card.Title className='cardText'>{item.title}</Card.Title>
                                                <Card.Subtitle className='cardText'>{item.user.username}</Card.Subtitle>
                                                <button className='homePlayButton' onClick={(e) => {
                                                    e.preventDefault();
                                                    playSong(item.midi, item.instruments, item.noteTypes, item.bpm)
                                                }}><FaPlayCircle size={90} />
                                                </button>
                                                <button className='cardHeart'>
                                                {liked.filter((like) => like.postID === item.id).length ? <FaHeart onClick={()=>onRemove(item.id)}/> : <FaRegHeart onClick={() => onLike(item.id)}/>}
                                                </button>
                                                <button className='cardTrash'>
                                                    <FaTrash onClick={()=>onRemovePost(item.id)} className='cardTrash'/>
                                                </button>        
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </Container>
                </> : <></>}
            </div>
        </div>

        </div>
        
        </>
    )
}
export default Cards