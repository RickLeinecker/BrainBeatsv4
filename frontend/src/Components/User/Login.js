import React, { Component, useState } from "react";
import './Login.css'
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stage, setStage] = useState(1);
    const [code, setCode] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    // const onSubmit = (event) => {
    //     alert(email + " " + password);
    //     setStage(2);
    // }

    const loginAccount = (event) => {

        //allows form to work without problems on start and submit
        event.preventDefault();

        //starting path for API endpoint
        const path = require('../Path');
        
        //put all input fields into a json object
        const loginCheck = {
            "email": email,
            "password": password
        };
        //create a json to pass into axois
        let config = {
            method: "post",
            url: path.buildPath('/users/loginUser'),
            headers:{
                "Content-Type": "application/json"
            },
            data: loginCheck
        };
        //axios command
        axios(config).then(function (res){
            console.log(res.data);
        })
        .catch(function (err){
            console.error(err.response.data);
        })


    }
    

    //Validates email field
    const validateEmail = (event) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexp.test(email))
        {
            loginAccount();
        }
        else
        {
            alert("FALSE EMAIL");
        }
      }

    return (

        <div class="box">
            <div class="form-box">
                    <div className="">
                      <form onSubmit={loginAccount}>
                            <h3>Sign In</h3>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
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
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        
                            <div id="HASH" class="blue-msg">
                                <p className="sign-up text-left">New here? <a href="/Register">Sign up</a></p>
                                <p className="forgot-password text-right">Forgot <a href="/Forgot">password?</a></p>
                            </div>
                        </form>
                    </div>

                {/* {stage == 2 && (
                    <div className="">
                        <form>
                            <h3>Verify Account</h3>
                            <div className="form-group">
                                <label>Enter Code</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Code"
                                    value={code}
                                    onChange={(event) => setCode(event.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Submit</button>
                        </form>
                    </div>

                )} */}
            </div>
        </div>
    );
}

export default Login;