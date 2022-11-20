import React, {useEffect, useState} from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function doLogin() {
        const userInformation = {
            "username": username,
            "password": password
        }
    }
    return (
        <div className='container' id='main-container'>
            <h1 className="login-text text-center fw-semibold">Welcome back to BrainBeats!</h1>
            <div className="mb-3">
                <label className="form-label form-text login-text">Username</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
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