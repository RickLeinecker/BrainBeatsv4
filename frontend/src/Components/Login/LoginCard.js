import React, { Component } from "react";

import './Login.css'
export default class LoginCard extends Component {
    render() {
        return (
            <div className="">
                <form>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
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
}