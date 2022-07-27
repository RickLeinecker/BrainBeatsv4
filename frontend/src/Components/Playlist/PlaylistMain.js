import React, { useState, useEffect } from "react";
import { Card, Container} from "react-bootstrap";
import "./Playlist.css";

import { useRecoilValue } from "recoil";

import { userJWT, userModeState } from "../context/GlobalState";
import sendAPI from "../sendAPI";

const PlaylistBody = () => {
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  const [noPlaylist, setNoPlaylist] = useState('');
  const [playlist, setPlaylist] = useState([]);

  useEffect(() =>{

    const params = {
      userID: user.id
    }

    sendAPI('get', '/playlists/getUserPlaylists', params)
    .then((res) => {
      setPlaylist(res.data)
    })
  },[])

  return (
    <>
      <div className="playlistBody">
        <div className="Header">
          <p className="headerText">Your Playlists</p>
          <hr />
        </div>
        <div className="body">
          <Container >
            <div className="displayBodyCard">
              <p>{noPlaylist}</p>
              {playlist.map((item, index) => {
                return (
                  <div key={index}>
                    <Card className="cardStyle">
                      <Card.Img
                        variant="top"
                        className="playhover"
                        src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                      />
                      <Card.Body>
                        <Card.Title className="cardText">
                          {item.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
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
