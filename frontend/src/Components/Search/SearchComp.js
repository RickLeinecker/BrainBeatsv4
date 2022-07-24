import React, { useState, useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa";
import { Card, Button, Container } from "react-bootstrap";
import MidiPlayer from "react-midi-player";
import "./search.css";
import { useRecoilValue } from "recoil";

import { userJWT, userModeState } from "../context/GlobalState";
import sendAPI from "../sendAPI";

const SearchComp = () => {
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  const [post, setPost] = useState([]);

  useEffect(() => {
    sendAPI("get", "/posts/getAllPosts").then((res) => {
      setPost(res.data);
    });
  }, []);

  console.log(post);
  return (
    <>
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
                        />
                        <Card.Body>
                          <button
                            className="cardPlayButton"
                            onClick={(e) => { }}
                          >
                            <FaPlayCircle size={90} />
                          </button>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col">
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <p className="username">
                          {item.user.username}
                        </p>
                        <p className="createdDate">
                          {item.createdAt.substr(0, 10)}
                        </p>
                      </div>
                      <div>
                        <p className="postText">{item.title}</p>
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
