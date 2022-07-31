import React, { useState, useEffect } from "react";
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

    const params = {
      userID: user.id,
    }

    sendAPI('get', '/playlists/getUserPlaylists', params)
    .then((res) => {
      setPlaylist(res.data)
    })
  },[])



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
                    <Card className="playlistCover" key={index} onClick={onClick}>
                      <Card.Img
                        variant="top"
                        className="playhover"
                        src={item.thumbnail}
                      />
                      <Card.Body>
                        <Card.Title className="cardText">
                          {item.name}
                        </Card.Title>
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
