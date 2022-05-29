import React, { Component, useState } from "react";
import axios from "axios";



const RegisterCard = () => {
    //useStates to get required fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setdob] = useState("");
    const [errorMsg, setErrorMsg] = useState('');


    const emptyField = () => {
        return (!email || !password || !username || !firstName || !lastName || ! dob)   
    }
    const createAccount = (event) => {
        //allows form to work without problems on start and submit
        event.preventDefault();
        if(emptyField()){
            setErrorMsg("Fill out all fields please");
            return;
        }
        if (validateEmail()){
            setErrorMsg("Invalid Email format");
            return;
        }
            
        //starting path for API endpoint
        const path = require('../Path');

        //put all input fields into a json object
        const newUser = {
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob + 'T00:00:00.000Z', //Date format for SQL
            "email": email,
            "username": username,
            "password": password
        };
        console.log(newUser);
        //create a json to pass into axois
        let config = {
            method: "post",
            url: path.buildPath('/users/createUser'),
            headers: {
                "Content-Type": "application/json"
            },
            data: newUser
        };
        //axios command
        axios(config).then(function (res) {
            console.log(res.data);
        })
            .catch(function (err) {
                setErrorMsg(err.response.data.msg);
            })
    }

    //Validates email field
    const validateEmail = (event) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }


    //onSubmit={createAccount}
    return (
        <>
            <div className='center' style={{ marginLeft: '25%', marginTop: '5%'}}>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='editCard'>
                            <div className="Title">
                                <h2>Register</h2>
                            </div>
                            <div className="body">
                                <div className='row'>
                                <div className="pr-1 col-md-6">
                                        <div className="form-group">
                                            <label>Username<span className='asterisk'>*</span></label>
                                            <input placeholder="Username" type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="pl-1 col-md-6">
                                        <div className="form-group">
                                            <label>Password<span className='asterisk'>*</span></label>
                                            <input placeholder="Password" type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='row'>
                                    <div className="pr-1 col-md-6">
                                        <div className="form-group">
                                            <label>First Name<span className='asterisk'>*</span></label>
                                            <input placeholder="First Name" type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="pl-1 col-md-6">
                                        <div className="form-group">
                                            <label>Last Name<span className='asterisk'>*</span></label>
                                            <input placeholder="Last Name" type="text" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                <div className="pr-1 col-md-6">
                                        <div className="form-group">
                                            <label>Email<span className='asterisk'>*</span></label>
                                            <input placeholder="Email" type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="pl-1 col-md-6">
                                        <div className="form-group">
                                            <label>Date of Birth<span className='asterisk'>*</span></label>
                                            <input placeholder="DOB" type="date" className="form-control" onChange={(e) => setdob(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <p className="errMsg">{errorMsg}</p>
                                <div className="cardButton">
                                    <button type="submit" className="btn-fill pull-right btn btn-info" onClick={createAccount}>Register</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterCard;