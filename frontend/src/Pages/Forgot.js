import React, { Component } from "react";

import Navbar from '../Components/Navbar/Navbar'
import Forgot from '../Components/User/Forgot'

export default class Login extends Component {
    render() {
        return (
            <>
            <Navbar />
            <Forgot />
            </>
        );
    }
}