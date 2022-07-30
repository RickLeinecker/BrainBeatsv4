import React, { useEffect, useState } from "react";
import {FaPlayCircle,FaTrash } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import sendAPI from "../sendAPI";
import { useRecoilValue } from 'recoil';

import { Modal } from "react-bootstrap";

import {userJWT, userModeState} from '../context/GlobalState'

const Playlist = () => {
  //id for the playlist
  const { pid } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [allPost, setAllPost] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [newTitle, setNewTitle] = useState('')

  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  useEffect(() => {

    const params = {
      id: pid,
    };
    sendAPI("get", "/playlists/getPlaylistByID", params).then((res) => {
      setPlaylist(res.data);
    getPost()
    });
    
  }, []);

  const getPost=()=>{
    const params = {
      id: pid,
    };
    sendAPI('get', '/playlists/getPostsByPlaylistID', params).then((res)=> {
      setAllPost(res.data)
    })
  }

  const updatePlaylist = () =>{
    const bodyData ={
      playlistID: pid,
      title: newTitle,
      thumbnail: thumbnail,
      token: jwt,
    }
    
  }

  const openModal = () => {
    setModalState(true);
  }
  const closeModal = () => {
    setModalState(false);
  }

  const deleteSong=(prop)=>{ 
    const dataBody = {
      postID: prop,
      playlistID: pid,
      token: jwt,
    }
    sendAPI("delete", "/playlists/removePostFromPlaylist", dataBody)
      .then((res) =>{
        getPost()
      })
  }

  return (
    <div className="playlistMain">
      <div className="playlistHeader">
        <img
          src={
            playlist.thumbnail
              ? playlist.thumbnail
              : "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
          }
          className="playlistSinglePic"
        />
        <button className="editButton" onClick={openModal}>
          Edit Playlist
        </button>
        <label className="playlistTitle">{playlist.name}</label>
        
      </div>
      <table className="playlistBody">
        <tbody>
      {allPost.map((item, index) => {
            return(
              <tr key={index}>
                <td><img className="smallPostThumbnail" src={item.post.thumbnail? item.post.thumbnail :"https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"} /> </td>
                <td className="smallPostText">{index} - {item.post.title}</td>
                <td><button className="playlistPostButton" onClick={(e) =>deleteSong(item.post.id)}><FaTrash /></button></td>
                <td><button className="playlistPostButton"><FaPlayCircle /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal show={modalState} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" onChange={(e) => setNewTitle(e.target.value)}/>
        
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Playlist;
