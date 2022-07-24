import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaPlayCircle,
  FaPlus,
  FaEllipsisH,
} from "react-icons/fa";
import { Card, Modal, Dropdown, Button } from "react-bootstrap";

import MidiPlayer from "react-midi-player";
import "./search.css";
import { useRecoilValue } from "recoil";

import { userJWT, userModeState } from "../context/GlobalState";
import sendAPI from "../sendAPI";

const SearchComp = () => {
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  const [userPlaylist, setUserPlaylist] = useState([]);
  const [post, setPost] = useState([]);
  //states to create/addto playlist
  const [addPlay, setAddPlay] = useState(false);
  const [createPlay, setCreatePlay] = useState(false);
  const [playListTitle, setPlayListTitle] = useState("");
  const [picture, setPicture] = useState();
  const [message, setMessage] = useState("");

  const [currentSelectPost, setCurretSelectPost] = useState('');

  useEffect(() => {
    sendAPI("get", "/posts/getAllPosts").then((res) => {
      setPost(res.data);
    });
    if (user) {
      const dataParam = {
        userID: user.id,
      };
      sendAPI("get", "/playlists/getUserPlaylists", dataParam).then((res) => {
        setUserPlaylist(res.data);
      });
    }
  }, []);

  function showAdd(event) {
    console.log(event)
    setAddPlay(true);
    setCurretSelectPost(event.id)
  }

  function showCreate() {
    setCreatePlay(true);
  }

  function hideModals() {
    setAddPlay(false);
    setCreatePlay(false);
    setCurretSelectPost('');
    setMessage('');
  }

  function createPlaylist() {
    const dataBody = {
      name: playListTitle,
      userID: user.id,
      token: jwt,
    };
    sendAPI("post", "/playlists/createPlaylist", dataBody).then((res) => {
      setMessage("Playlist Created");
    });
  }

  function addToPlaylist(prop) {
    const bodyData ={
      postID: currentSelectPost,
      playlistID: prop.id,
      token: jwt,
    }
    console.log(bodyData);
    sendAPI('post', '/playlists/addPostToPlaylist', bodyData)
    .then((res) => {
      console.log(res);
    })
  }

  return (
    <>
      <Modal show={addPlay} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add to playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userPlaylist.map((item, index) => {
            return (
              <div key={index}>
                <div className="row" style={{ margin: "3px" }}>
                  <div className="col-sm-3">
                    <img
                      src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                      className="modalImg"
                    />
                  </div>
                  <div
                    className="col"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="ModalTitle">{item.name}</p>
                    <button className="ModalAddButton" onClick={(e)=>addToPlaylist(item)}>Add to Playlist</button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
      <Modal show={createPlay} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: "left" }}>
            Playlist Title <span style={{ color: "red" }}>*</span>
          </p>
          <input
            onChange={(e) => setPlayListTitle(e.target.value)}
            className="inputModal"
          />
          <p style={{ textAlign: "left" }}>Playlist Thumbnail</p>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.value)}
            className="inputModal"
          />
        </Modal.Body>
        <Modal.Footer>
          <p>{message}</p>
          <Button variant="primary" onClick={createPlaylist}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="searchMainBody">
        <div className="Header">
          <p className="searchHeaderText">Search results for: ""</p>
          <hr />
        </div>
        <div className="searchBody">
          {post.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className="row">
                    <div className="col-sm-3">
                      <Card className="cardStyleSearch">
                        <Card.Img
                          variant="top"
                          className="playhover"
                          src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                          style={{ height: "150px", width: "150px" }}
                        />
                        <Card.Body>
                          <button
                            className="cardPlayButton"
                            onClick={(e) => {}}
                          >
                            <FaPlayCircle size={90} />
                          </button>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="username">{item.user.username}</p>
                        <p className="createdDate">
                          {item.createdAt.substr(0, 10)}
                        </p>
                      </div>
                      <div>
                        <p className="postText">{item.title}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <button className="statusButton">
                          <FaHeart />
                          &nbsp; <p className="statusText">{item.likeCount}</p>
                        </button>
                        <Dropdown className="reactDrop">
                          <Dropdown.Toggle
                            variant="default"
                            id="dropdown-basic"
                          >
                            <FaEllipsisH /> &nbsp; More
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={showCreate}>
                              Create playlist
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => showAdd(item)}>
                              Add to playlist
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SearchComp;
