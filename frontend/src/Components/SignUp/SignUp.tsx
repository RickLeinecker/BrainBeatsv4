import React, {useEffect, useState} from "react";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    function validateEmail(inputEmail:string) {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (inputEmail.match(emailRegex)) return true;
        return false;
    }
    
    function doSignUp() {
        const userInformation = {
            "fullName": fullName,
            "email": email,
            "username": username,
            "password": password
        }

        if(validateEmail(email)) {
            // continue register
        }
    }

    return (
        <div className='container' id='main-container'>
            <h1 className="text-center fw-semibold">Welcome to BrainBeats!</h1>
            <div className="mb-3">
                <label className="form-label form-text">Full Name</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full Name" onChange={event => setFullName(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label form-text">Email</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label form-text">Username</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label form-text">Password</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
            </div>
            <div className='container text-center'>
                <button type="submit" className="btn btn-primary" onClick={doSignUp}>Sign up</button>
            </div>
        </div>);
}

export default SignUp;