import React, {useEffect, useState} from "react";
import './Login.css';
import sendAPI from '../../SendAPI';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function doLogin() {
        const userInformation = {
            "email": email,
            "password": password
        }

        sendAPI('post', '/users/loginUser', userInformation)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='container' id='main-container'>
            <h1 className="login-text text-center fw-semibold">Welcome back to BrainBeats!</h1>
            <div className="mb-3">
                <label className="form-label form-text login-text">Email</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label form-text login-text">Password</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
            </div>
            <div className='container text-center'>
                <button type="submit" className="btn btn-primary" onClick={doLogin}>Sign in</button>
            </div>
        </div>);
}

export default Login;