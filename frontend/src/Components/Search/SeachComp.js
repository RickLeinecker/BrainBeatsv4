import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Card, Button, Container } from 'react-bootstrap';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './search.css'

const SeachComp = () => {
  const { user } = useContext(AuthContext);
  let search = '';
  const [Post, setPost] = useState([]);
  const [log, setLog] = useState();
  const path = require('../Path');
  //midi data which is a sting
  const [data, setData] = useState('');
  //boolean for botton nav
  const [showMedia, setShowMedia] = useState(false);
  let _data = atob(data);

  //get data onload
  useEffect(() => {
    searchPost()
  }, [])

  //stop playing and hide player
  const endPlay = () => {
    setData('');
    setShowMedia(false);
  }
  //axios call for finding post
  const searchPost = () => {
    const dataBody = {
      'username': search
  }
  let config = {
      method: 'get',
      url: path.buildPath('/posts/getUserPostsByUsername'),
      params: dataBody,
  }
  axios(config)
      .then((res) => {
          setPost(res.data);
          setLog(res);
      })
      .catch((err) => {
          setLog(err);
      })

  }

  const handle = () => {
    console.log(Post)
    console.log(log)
  }

  return (
    <div className='container searchBody'>
      <button onClick={handle}>HE</button>
      <div className='row'>
        <div>
          <input className='textBox' placeholder='Search Box' onChange={(event) => {
            //the reason search is not a use state is setState is asyncronous which
            //messes with live search
            search = event.target.value;
            //call axios
            searchPost();
          }} />

        </div>

      </div>
      <div className='row'>
        <div>
          <Container>
            <div className='cardFlex'>
              {Post.map((item, index) => {
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
                          <FaHeart />
                        </button>
                        
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
            </div>
          </Container>
        </div>
      </div>
      <div className='row' style={{ height: '50px' }}>
        <div className={`${showMedia ? 'mediaPlayerAct' : 'mediaPlayer'}`}>
          <div>
            <MidiPlayer data={_data} autoplay onEnd={endPlay} />
          </div>
        </div>
      </div>

    </div>
  )
}
export default SeachComp;