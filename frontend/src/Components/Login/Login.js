import React, { Component, useState } from "react";

import './Login.css'
const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) =>{
        alert(email +" "+password);
    }

        return (
            <div className="">
                <form onSubmit={onSubmit}>
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
                        <p className="sign-up text-left">New here? <a href="#">Sign up</a></p>
                        <p className="forgot-password text-right">Forgot <a href="#">password?</a></p>
                    </div>

                </form>
            </div>
        );
}

export default LoginCard;