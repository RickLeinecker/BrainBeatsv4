import React, { Component, useContext, useState } from "react";
import './Login.css'
import { useRecoilState } from "recoil";
import {userModeState, userJWT} from '../context/GlobalState'
import sendAPI from "../sendAPI";


const Login = () => {

    const [userMode, setUserMode] = useRecoilState(userModeState);
    const [userJwt, setUserJwt] = useRecoilState(userJWT);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');


    const loginAccount = (event) => {
        //need this else form will not work
        event.preventDefault()
        //starting path for API endpoint
        const path = require('../Path');

        //put all input fields into a json object
        const loginCheck = {
            "email": email,
            "password": password,
            //'token': userJwt,
        };
        sendAPI('post', '/users/loginUser', loginCheck)
            .then((res) =>{
                setUserJwt(res.data.token)
                setUserMode(res.data.user)
            })
            .catch((err) =>{
                setErrMsg(err.response.data.msg);
            })
        
    }

    return (

        <div className="box">
            <div className="form-box">
                <div className="">
                    <form onSubmit={loginAccount}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                required
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <p className='errMsg'>{errMsg}</p>
                        <button type="submit" className="btn btn-primary btn-block submitButton">Submit</button>

                        <div id="HASH" className="blue-msg">
                            <p className="sign-up text-left">New here? <a href="/Register">Sign up</a></p>
                            <p className="forgot-password text-right">Forgot <a href="/Forgot">password?</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;