import React, { useContext, useEffect, useRef, useState } from 'react'
import './profile.css'

import { useRecoilValue } from 'recoil';
import { userJWT, userModeState } from '../context/GlobalState'
import sendAPI from '../sendAPI';

const Profile = () => {

    const user = useRecoilValue(userModeState);
    const jwt = useRecoilValue(userJWT);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [dob, setDob] = useState(user.dob);
    const [stage, setStage] = useState(0);
    const [bio, setBio] = useState(user.bio);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [errorMsg, setErrorMsg] = useState('');

    // API call to BE to get updated user info to input fields
    useEffect(() => {
        sendAPI('get', `/users/getUserByID?id=${user.id}`, null)
            .then(function (res) {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setDob(res.data.dob);
                setEmail(res.data.email);
                setUsername(res.data.username);
                setBio(res.data.bio);
                setProfilePicture(res.data.profilePicture);
                console.log(user)

            })
            .catch(function (err) {
                setErrorMsg(err.response.data.msg);
            })
    }, [])

    // const emptyField = () => {
    //     return (!email || !username || !firstName || !lastName || !bio || !profilePicture)
    // }

    const updateProfilePic = (file) => {
        var file = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            setProfilePicture(baseString); 
        };
        reader.readAsDataURL(file);
        // setProfilePicture(baseString);
    }

    const UpdateProfile = (event) => {
        event.preventDefault();
        // if (emptyField()) {
        //     setErrorMsg("Fill out all fields please");
        //     return;
        // }
        if (validateEmail()) {
            setErrorMsg("Invalid Email format");
            setStage(0);
            return;
        }

        const path = require('../Path');

        const newUser = new FormData();
        newUser.append('id', user.id);
        newUser.append('firstName', firstName);
        newUser.append('lastName', lastName);
        newUser.append('dob', dob);
        newUser.append('email', email);
        newUser.append('username', username);
        newUser.append('bio', bio);
        newUser.append('profilePicture', profilePicture);
        newUser.append('token', jwt);

        // for (const value of newUser.values()) {
        //     console.log(value);
        //   }

        sendAPI('put', '/users/updateUser', newUser)
            .then(function (res) {
                console.log(res.data);
            })
            .catch(function (err) {
                setErrorMsg(err.response.data.msg);
            })

        console.log(newUser);
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
        console.log(profilePicture)
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
                                        <input placeholder={user ? user.username : 'username'} onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" value={username} />
                                    </div>
                                </div>
                                <div className="px-1 col-md-3">
                                    <div className="form-group">
                                        <label>DOB</label>
                                        <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} />
                                    </div>
                                </div>
                                <div className="pl-1 col-md-6">
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input placeholder={user ? user.email : 'email'} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" value={email} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="pr-1 col-md-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder={user ? user.firstName : 'First Name'} onChange={(event) => setFirstName(event.target.value)} type="text" className="form-control" value={firstName} />
                                    </div>
                                </div>
                                <div className="pl-1 col-md-6">
                                    <div className="form-group">
                                        <label>Last Name </label>
                                        <input placeholder={user ? user.lastName : 'Last Name'} onChange={(event) => setLastName(event.target.value)} type="text" className="form-control" value={lastName} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>About Me</label>
                                        <textarea cols="80" placeholder={user.bio ? user.bio : 'User bio'} onChange={(event) => setBio(event.target.value)} rows="5" className="form-control" value={bio}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label for="file-upload" className="custom-file-upload">
                                        Upload Image (optional)
                                    </label>
                                    <input id="file-upload" onChange={(event) => updateProfilePic(event.target.files[0])} type="file"/>
                                    </div>
                                </div>
                            </div>
                            <div className="cardButton">
                                <button type="button" onClick={UpdateProfile} class="btn-fill pull-right btn btn-info">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="userCard">
                        <div className="author">
                            <img className='profileImg' src={profilePicture}></img>
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