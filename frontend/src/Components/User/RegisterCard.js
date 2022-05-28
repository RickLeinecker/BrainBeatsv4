import React, { Component, useState } from "react";
import './Login.css'
import axios from "axios";



const RegisterCard = () => {
    //useStates to get required fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername ] = useState("");
    const [firstName, setFirstName ] = useState("");
    const [lastName, setLastName ] = useState("");
    const [dob, setdob ] = useState("");
    

    const createAccount = (event) => {
        //allows form to work without problems on start and submit
        event.preventDefault();

        //starting path for API endpoint
        const path = require('../Path');
        
        //put all input fields into a json object
        const newUser = {
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob + "T00:00:00.000Z",
            "email": email,
            "username": username,
            "password": password
        };
        //create a json to pass into axois
        let config = {
            method: "post",
            url: path.buildPath('/users/createUser'),
            headers:{
                "Content-Type": "application/json"
            },
            data: newUser
        };
        // validateEmail();
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
            createAccount();
        }
        else
        {
            alert("FALSE EMAIL");
        }
    }
    

    return (
        <div className="">
            <form onSubmit={createAccount}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter date of birth"
                        value={dob}
                        onChange={(event) => setdob(event.target.value)}
                    />
                </div>
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
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block col-md-4">Submit</button>
            </form>
        </div>
    )
}

export default RegisterCard;