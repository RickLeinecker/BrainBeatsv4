import React, { Component, useState } from "react";
import './Login.css'
import axios from "axios";
const bp =  'http://localhost:2000/api/users/createUser';


const RegisterCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername ] = useState("");
    const [name, setName ] = useState("");
    

    const onSubmit = (event) => {
        //event.preventDefault();
        //alert(name + " " + email + " " + username + " " + password);

        const newUser = {
            "name": name,
            "email": email,
            "username": username,
            "password": password
        };

        let newUserJson = JSON.stringify(newUser);

        let config = {
            method: "post",
            url: bp,
            headers:{
                "Content-Type": "application/json"
            },
            data: newUserJson
        };
        // console.log(config.data)
        axios(config).then(function (res){
            alert("in axios");
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
            onSubmit();
        }
        else
        {
            alert("FALSE EMAIL");
        }
    }

    return (
        <div className="">
            <div>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Full name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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

                <button type="submit" className="btn btn-primary btn-block" onClick={validateEmail}>Submit</button>
            </div>
        </div>
    )
}

export default RegisterCard;