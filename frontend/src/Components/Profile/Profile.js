import React, { useContext, useState } from 'react'
import { Card } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import './profile.css'

import { useRecoilValue } from 'recoil';
import {userModeState} from '../context/GlobalState'

const Profile = () => {

    const user = useRecoilValue(userModeState);
    

    // //useStates to get required fields
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState();
    const [stage, setStage] = useState(0);
    const [bio, setBio] = useState("");
    const [errorMsg, setErrorMsg] = useState('');

    const emptyField = () => {
        return (!email || !username || !firstName || !lastName || !bio)
    }
    
    const UpdateProfile = (event) => {
        event.preventDefault();
        if (emptyField()) {
            setErrorMsg("Fill out all fields please");
            return;
        }
        if (validateEmail()) {
            setErrorMsg("Invalid Email format");
            setStage(0);
            return;
        }

        const path = require('../Path');

        //put all input fields into a json object
        const newUser = {
            "id": user.id,
            "firstName": firstName,
            "lastName": lastName,
            'dob': dob,
            "email": email,
            "username": username,
            "bio": bio
        };

        console.log(newUser);

        //create a json to pass into axois
        let config = {
            method: "put",
            url: path.buildPath('/users/updateUser'),
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

    let editProfile = false;

    const editTrue = () => {
        editProfile = true;
    }
    const handle = (e) => {
        e.preventDefault();
        console.log(user);
        console.log(firstName)
        console.log(lastName)
        console.log(dob)
        console.log(email)
        console.log(username)
        console.log(bio)
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

    

    return (
        <div className='content-fluid'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='editCard'>
                        <div className="Title">
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="body">
                            <div className='row'>
                                <div className="pr-1 col-md-3">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input placeholder={user ? user.username : 'username'} onChange = {(event) => setUsername(event.target.value)} type="text" className="form-control" value={username}/>
                                    </div>
                                </div>
                                <div className="px-1 col-md-3">
                                    <div className="form-group">
                                        <label>DOB</label>
                                        <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="pl-1 col-md-6">
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input placeholder={user ? user.email : 'email'} onChange = {(event) => setEmail(event.target.value)} type="text" className="form-control" value={email}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="pr-1 col-md-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder={user ? user.firstName : 'First Name'} onChange = {(event) => setFirstName(event.target.value)} type="text" className="form-control" value={firstName}/>
                                    </div>
                                </div>
                                <div className="pl-1 col-md-6">
                                    <div className="form-group">
                                        <label>Last Name </label>
                                        <input placeholder={user ? user.lastName : 'Last Name'} onChange = {(event) => setLastName(event.target.value)} type="text" className="form-control"  value={lastName}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>About Me</label>
                                        <textarea cols="80" placeholder={user.bio ? user.bio : 'User bio'} onChange = {(event) => setBio(event.target.value)} rows="5" className="form-control" value={bio}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="cardButton">
                                <button type="button" onClick = {UpdateProfile} class="btn-fill pull-right btn btn-info">Update Profile</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="userCard">
                        <div className="author">
                            <img className='profileImg' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII='></img>
                            <p>{user ? user.firstName + " " + user.lastName : "First Name Last Name"}</p>
                        </div>
                        <div className='userBody'>
                            <p>{user.bio ? user.bio : 'Please fill in your bio'}</p>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Profile