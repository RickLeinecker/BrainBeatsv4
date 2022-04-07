import React, { Component } from "react";

import Navbar from '../Components/Navbar/Navbar'
import RegisterBody from '../Components/User/RegisterCard'

export default class Login extends Component {
    render() {
        return (
            <>
            <Navbar />
            <RegisterBody />
            </>
        );
    }
}