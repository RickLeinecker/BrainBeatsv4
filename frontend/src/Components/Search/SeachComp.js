import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import MidiPlayer from 'react-midi-player';
import './search.css'
import { useRecoilValue } from 'recoil';

import { userModeState } from '../context/GlobalState'

const SeachComp = () => {
  const user = useRecoilValue(userModeState);
  let search = '';
  const [Post, setPost] = useState([]);
  const [liked, setLiked] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const path = require('../Path');
  //midi data which is a sting
  const [data, setData] = useState('');
  //boolean for botton nav
  const [showMedia, setShowMedia] = useState(false);
  let _data = atob(data);

  //get data onload
  useEffect(() => {
    searchPost()
    if (user) {
      let config = {
        method: 'get',
        url: path.buildPath('/likes/getAllUserLikes'),
        body: {
          "userID": user.id
        }
      }
      axios(config)
        .then((res) => {
          setLiked(res.data);
        })
    }
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
        setErrMsg('');
      })
      .catch((err) => {
        setPost([])
        setErrMsg(err.response.data.msg)
      })

  }
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
        setLiked((l) => [...l, res.data])
      })
      .catch((err) => {
        console.log(err.data)
      })
  }, [])

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
        setLiked((l) => l.filter((p) => p.postID !== post))
      })
      .catch((err) => {
        console.log(err.data)
      })
  }, [])

  const handle = () => {
    console.log(Post)
    console.log(liked)
    console.log(user)
  }

  return (
    <div className='container searchBody'>
      <button onClick={() => handle()}>HE</button>
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
      <div className='row' style={{ paddingLeft: '20px' }}>
        <div className='row'>
          <div className='col-sm-4 PostHeader'>
            Title
          </div>
          <div className='col-sm-4 PostHeader'>
            Author
          </div>
          <div className='col-sm-2 PostHeader'>
            Like
          </div>
          <div className='col-sm-2 PostHeader'>
            Add Playlist
          </div>
        </div>
        <div className='errMsg'>{errMsg}</div>
        {Post.map((item, index) => {
          return (
            <div className='row' key={index}>
              <div className='col-sm-4 postItem'>
                {item.title}
              </div>
              <div className='col-sm-4 postItem'>
                {item.user.username}
              </div>
              <div className='col-sm-2 postItem'>
                <button className='HeartButton'>
                  {liked.filter((like) => like.postID === item.id).length ? <FaHeart onClick={() => onRemove(item.id)} /> : <FaRegHeart onClick={() => onLike(item.id)} />}
                </button>
              </div>
              <div className='col-sm-2 postItem'>
                Add Playlist
              </div>
            </div>
          )

        })}
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