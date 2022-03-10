import React, { Component } from "react";

import Navbar from '../Components/Navbar/Navbar'
import LoginBody from '../Components/Login/LoginCard'

export default class Login extends Component {
    render() {
        return (
            <>
            <Navbar />
            <LoginBody />
            </>
        );
    }
}