import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Card, Container} from "react-bootstrap";
import "./Playlist.css";
import { useRecoilValue } from "recoil";
import {useNavigate} from 'react-router-dom'
import { userJWT, userModeState } from "../context/GlobalState";
import sendAPI from "../sendAPI";

const PlaylistBody = () => {
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);
  const [thumbnail, setThumbnail] = useState();
  const [noPlaylist, setNoPlaylist] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{ 
    getAllMyPlaylist();
  },[playlist])

  const getAllMyPlaylist = () =>{
    const params = {
      userID: user.id,
    }

    sendAPI('get', '/playlists/getUserPlaylists', params)
    .then((res) => {
      setPlaylist(res.data)
    })
  }

  const deletePlaylist = (playlistID) => {
    const dataBody ={
      id: playlistID,
      token: jwt,
    }
    sendAPI('delete', '/playlists/deletePlaylist', dataBody)
    .then(res => {
      getAllMyPlaylist()
    })
  }



  return (
    <>
      <div className="playlistMain">
        <div className="Header">
          <p className="headerText">Your Playlists</p>
          <hr />
        </div>
        <div className="body">
          <Container >
            <div className="displayBodyCard">
              <p>{noPlaylist}</p>
              {playlist.map((item, index) => {

                const onClick = () => {
                    navigate("/Playlist/"+item.id)
                }

                return (
                    <Card key={index} style={{border: '0px', margin: '1.9em'}}>
                      <Card.Img
                        variant="top"
                        className="playlistCover"
                        src={item.thumbnail}
                        onClick={onClick}
                      />
                      <Card.Body>
                        <Card.Title className="cardText">
                          {item.name}
                        </Card.Title>
                        <button className='cardTrash'>
                          <FaTrash onClick={()=>deletePlaylist(item.id)} className='playlistTrash'/>
                        </button>  
                      </Card.Body>
                    </Card>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PlaylistBody;
