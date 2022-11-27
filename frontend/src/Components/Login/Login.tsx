import {useState} from "react";
import './Login.css';
import sendAPI from '../../SendAPI';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { userJWT, userModeState } from "../../JWT";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [JWT, setJWT] = useRecoilState(userJWT);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const navigate = useNavigate();

    
    async function doLogin() {
        const userInformation = {
            "email": email,
            "password": password
        }

        sendAPI('post', '/users/loginUser', userInformation)
            .then(res => {
                setJWT(res.data.token);
                setUserMode(res.data.user);
                navigate('/profile');
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
            <br />            <br />
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