import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap';
import './Playlist.css'

import { useRecoilValue } from 'recoil';

import { userJWT, userModeState } from '../context/GlobalState'
import sendAPI from '../sendAPI';

const PlaylistBody = () => {
  const [toggle, setToggle] = useState(false);
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  return (
    <>
      <label className='switch'>
        <input type='checkbox' className='switch-input' checked={toggle} onChange={() => setToggle(!toggle)}/>
        <span className="switch-label" data-on="Find" data-off="Create"></span>
        <span className="switch-handle"></span>
      </label>
      <div className='container mainContainer'>
        {toggle ? "" : <CreatePlayList id={user.id} jwt = {jwt}/>}
      </div>
    </>
  )
}

export default PlaylistBody

function CreatePlayList({id, jwt}){

  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  console.log(id);
  const path = require('../Path');

  const makePlaylist = () => {
    const bodyData = {
      'name': name,
      'userID': id,
      'token': jwt
    }
    sendAPI('post', '/playlists/createPlaylist', bodyData)
      .then((res) => {
        setMsg("Playlist created");
      })
      
  }

  return(
    <>
    <div className='row'>
      <h1 style={{color: 'white'}}>Create Playlist</h1>
      <p>{msg}</p>
    </div>
    <div className='row'>
      <div className='col-sm-8'>
        <p style={{color: 'white'}}>Title</p>
        <input type='text' onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='col-sm-4'>
        <Button className='button' onClick={makePlaylist}>Create</Button>
      </div>
      
    </div>
    </>
  )
}