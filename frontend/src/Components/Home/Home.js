import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { CardList } from './CardList';
import { FaHeart, FaPlayCircle, FaRegHeart } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './homepage.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';

const Cards = () => {
    //post array
    const [allPost, setAllPost] = useState([]);
    const [userPost, setUserPost] = useState([]);
    const [log, setLog] = useState();
    //midi data which is a sting
    const [data, setData] = useState('');
    //boolean for botton nav
    const [showMedia, setShowMedia] = useState(false);
    const { user } = useContext(AuthContext);
    //Load data to be sent to MidiPlayer
    let _data = atob(data);

    const path = require('../Path');

    const [liked, setLiked] = useState([]);

    useEffect(() => {
        //always run this api for homepage
        let config = {
            method: 'get',
            url: path.buildPath('/posts/getAllPosts'),
        }
        axios(config)
            .then((response) => {
                setAllPost(response.data);
            })
        //only run this api if user is logged in
        if(user){
            const dataBody = {
                'userID': user.id
            }
            let config = {
                method: 'get',
                url: path.buildPath('/posts/getUserPostsByID'),
                params: dataBody,
            }
            axios(config)
                .then((res) => {
                    setUserPost(res.data);
                    setLog(res);
                })
                .catch((err) => {
                    setLog(err);
                })

            let config2 = {
                method: 'get',
                url: path.buildPath('/likes/getAllUserLikes'),
                body:{
                    "userID": user.id
                }
            }
            axios(config2)
                .then((res) => {
                    setLiked(res.data);
                })
        }
    }, [])

    // if(user){
    //     setUserPost(user.post);
    // }

    const onLike = useCallback((post) => {

        let bodyData = {
            userID: user.id,
            postID: post
        }
        let config = {
            method: 'post',
            url: path.buildPath('/likes/createUserLike'),
            data: bodyData,
        }
        axios(config)
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
            postID: post
        }
        let config = {
            method: 'delete',
            url: path.buildPath('/likes/removeUserLike'),
            data: bodyData,
        }
        axios(config)
            .then((res) => {
                setLiked((l) => l.filter((p) => p.postID !== post))})
            .catch((err) => {
                console.log(err.data)
            })
    },[])

    const endPlay = () => {
        setData('');
        setShowMedia(false);
    }
    const checkData = () => {
        console.log(allPost);
        console.log(user);
    }
    const handle = () => {
        console.log(liked)
    }
    return (
        <>
            {//if user is logged in dont display carousel
                !user ? <div style={{ width: '50%', marginLeft: '25%' }}>
                    <Carousel />
                </div> : <></>
            }
            <h1>RECENT SONGS</h1>
            <div style={{ overflowX: 'hidden' }}>
                <div className='row'>
                    <Container className='containerOverflow'>
                        <div style={{ display: 'inline-flex' }}>
                            {allPost.map((item, index) => {
                                return (
                                    <div key={index}>
                                        
                                        <Card className='cardStyle'>
                                            <Card.Img variant="top" className='playhover' src='https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png' />
                                            <Card.Body>

                                                <Card.Title className='cardText'>{item.title}</Card.Title>
                                                <Card.Subtitle className='cardText'>Name</Card.Subtitle>
                                                <button className='cardPlayButton' onClick={(e) => {
                                                    e.preventDefault();
                                                    setData(item.data); //store this items midi string to Data
                                                    setShowMedia(true); //reveal midi player
                                                }}><FaPlayCircle size={90} /></button>
                                                <button className='cardHeartButton'>
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
                                {userPost.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Card className='cardStyle'>
                                                <Card.Img variant="top" className='playhover' src='https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png' />
                                                <Card.Body>
            
                                                    <Card.Title className='cardText'>{item.title}</Card.Title>
                                                    <Card.Subtitle className='cardText'>{item.artist}</Card.Subtitle>
                                                    <button className='cardPlayButton' onClick={(e) => {
                                                        e.preventDefault();
                                                        //setData(item.data); //store this items midi string to Data
                                                        //setShowMedia(true); //reveal midi player
                                                    }}><FaPlayCircle size={90} /></button>
                                                    <button className='cardHeartButton'>
                                                    {liked.filter((like) => like.postID === item.id).length ? <FaHeart onClick={()=>onRemove(item.id)}/> : <FaRegHeart onClick={() => onLike(item.id)}/>}
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

// const LoggedIn = (prop) => {
    
//     const path = require('../Path');

//     useEffect(() => {
        
        
//     }, [userPost])

//     const handle = () => {


//         console.log(prop.prop.id)
//         console.log(userPost)
//         console.log(log)
//     }
    
// }
export default Cards