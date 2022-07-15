import React, { Component, useContext, useState } from "react";
import './Login.css'
import { AuthContext } from '../context/AuthContext'
import axios from "axios";
import { useRecoilState } from "recoil";
import {userModeState} from '../context/GlobalState'

const Login = () => {

    const [userMode, setUserMode] = useRecoilState(userModeState)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const { dispatch } = useContext(AuthContext);


    const loginAccount = (event) => {
        //need this else form will not work
        event.preventDefault()
        //starting path for API endpoint
        const path = require('../Path');

        //put all input fields into a json object
        const loginCheck = {
            "email": email,
            "password": password
        };
        //create field to pass to axios
        let config = {
            method: 'post',
            url: path.buildPath('/authentication/loginUser'),
            data: loginCheck,
        }
        //tell useContext to start login procedure
        dispatch({ type: 'LOGIN_START' });

        axios(config)
            .then(function (response) {
                let res = response.data;
                setUserMode(res)
                //login works, pass data into useContext
                //dispatch({ type: 'LOGIN_SUCCESS', payload: res });
                
            })
            .catch(function (err) {
                //login fails send error msg
                dispatch({ type: 'LOGIN_FAILURE', payload: err });
                setErrMsg("Incorrect Email or Password");
            })
        
    }


    //Validates email field
    const validateEmail = (event) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp.test(email)) {
            loginAccount();
        }
        else {
            alert("FALSE EMAIL");
        }
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
                        <p>{errMsg}</p>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>

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