import React from 'react';
import './Navbar.css';
import bbmascot from '../../images/bbmascot1.png';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

    const navigate = useNavigate();

    const doNavigate = (route:string) => {
        navigate(route);
    }


  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-light" id="navBarID">
        <a href="/" className='navbar-image-link'><img className='navbar-image' src={bbmascot} alt="" width="35" height="35"/></a>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <form className="form-inline" id="formID">
                        <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/SignUp')} type="button">Sign Up</button>
                        <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Login')} type="button">Login</button>
                    </form>    
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;