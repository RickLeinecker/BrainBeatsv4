import React, { useState, useEffect, useCallback } from "react";
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
import { playMidiFile } from "../Record/Playback";

import Logo from '../Navbar/Logo.jpg'


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
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [currentSelectPost, setCurretSelectPost] = useState("");
  const [addedToPlay, setAddedToPlay] = useState('');

  const [liked, setLiked] = useState([]);

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

      sendAPI('get', '/likes/getAllUserLikes', dataParam)
        .then((res) => {
         setLiked(res.data);
         })
    }
  }, [liked]);

  function showAdd(event) {
    console.log(event);
    setAddPlay(true);
    setCurretSelectPost(event.id);
  }

  function showCreate() {
    setCreatePlay(true);
  }

  function hideModals() {
    setAddPlay(false);
    setCreatePlay(false);
    setCurretSelectPost("");
    setMessage("");
  }

  function searchFuntion(){
    const bodyData ={
      title: title
    }
    sendAPI("get", "/posts/getPostsByTitle", bodyData)
    .then((res) => {
      setPost(res.data);
    })
  }

  function createPlaylist() {
    const dataBody = {
      name: playListTitle,
      userID: user.id,
      token: jwt,
      thumbnail: thumbnail
    };
    sendAPI("post", "/playlists/createPlaylist", dataBody).then((res) => {
      setMessage("Playlist Created");
    });
  }

  function addToPlaylist(prop) {
    const bodyData = {
      postID: currentSelectPost,
      playlistID: prop.id,
      token: jwt,
    };
    console.log(bodyData);
    sendAPI("post", "/playlists/addPostToPlaylist", bodyData).then((res) => {
      setAddedToPlay("Post added to playlist");
    });
  }

  const handleSearch =(event)=> {
    if(event.key === 'Enter'){
      searchFuntion()
    }
  }

  const updateProfilePic = (file) => {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        setThumbnail(baseString); 
    };
    reader.readAsDataURL(file);
    // setProfilePicture(baseString);
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
                      src={thumbnail ? thumbnail : Logo}
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
                    <button
                      className="ModalAddButton"
                      onClick={(e) => addToPlaylist(item)}
                    >
                      Add to Playlist
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
          <p>{addedToPlay}</p>
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
          <label for="file-upload" className="custom-file-upload">
    				Upload Image (optional)
				</label>
				<input id="file-upload" onChange={(event) => updateProfilePic(event.target.files[0])} type="file"/>
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
          <input
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onKeyPress={handleSearch}
            onChange={(e)=> setTitle(e.target.value)}
          />
          <Button className="buttonStyle" onClick={searchFuntion}>
            Search
          </Button>
          <p className="searchHeaderText">Search results</p>
          <hr />
        </div>
        <div className="searchBody">
          {post.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className="row">
                    <div style={{width: '200px'}}>
                      <Card className="cardStyleSearch">
                        <Card.Img
                          variant="top"
                          className="playhover"
                          src={item.thumbnail ? item.thumbnail : Logo}
                          style={{ height: "150px", width: "150px" }}
                        />
                        <Card.Body>
                          <button
                            className="cardPlayButton"
                            onClick={(e) => {
                                e.preventDefault();
                                playMidiFile(item.midi, item.instruments, item.noteTypes, item.bpm);
                            }}
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
                        {liked.filter((like) => like.postID === item.id).length ? <FaHeart onClick={()=>onRemove(item.id)}/> : <FaRegHeart onClick={() => onLike(item.id)}/>}
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
