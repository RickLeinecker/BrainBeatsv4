import React, { useState, useEffect, useCallback, Children } from "react";
import { NavLink, RouteProps } from "react-router-dom";

// Import for Navbar functionality
import bbmascot from '../../images/bbmascot1.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userModeState } from "../../JWT";

// Import CSS
import './Sidebar.css';

// Import for Icons
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// Implemented using combination of the links below (converted to TypeScript): 
// how to create sidebar in react JS: https://www.youtube.com/watch?v=IathdVB65Lw&t=711s
// Responsive Menu Sidebar using React JS: https://www.youtube.com/watch?v=RiF1VFwgbOs&t=1121s

const Sidebar: React.FunctionComponent<RouteProps> = ({children, ...props}) => {
  
  const[isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem=[
    {
      path:"/",
      name:"Home",
      icon:<FontAwesomeIcon icon={["fas", "home"]} />
    },
    {
      path:"../about",
      name:"About",
      icon:<FontAwesomeIcon icon={["fas", "circle-info"]} />
    },
    {
      path:"../search",
      name:"Search",
      icon:<FontAwesomeIcon icon={["fas", "search"]} />
    },
    {
      path:"../create-track",
      name:"Create Track",
      icon:<FontAwesomeIcon icon={["fas", "plus"]} />
    },
  ]

  // Functions for navbar
  const user = useRecoilValue(userModeState);
    
  const navigate = useNavigate();

  const doNavigate = (route:string) => {
      navigate(route);
  }
  
  function doLogout() {
      
  }

  return (
      <div className="page">
        <header className="header">
          <div className="header-toggle top_section">
            <h1 style={{display: isOpen? "block" : "none", color: "white"}} className="logo">BrainBeats</h1>
            <div style={{marginLeft: isOpen? "35px" : "0px"}} className="bars">
              <FontAwesomeIcon style={{color: "white"}} icon={["fas", "bars"]} onClick={toggle} />
            </div>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                {/* If there isn't a user signed in, prompt them to do so */}
                {!user && <ul className="navbar-nav ml-auto">
                    <form className="form-inline" id="formID">
                        <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Register')} type="button" id="signUpBtn">Sign Up</button>
                        <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Login')} type="button" id="loginBtn">Login</button>
                    </form>    
                </ul>}
                {user && <ul className="navbar-nav ml-auto">
                    <form className="form-inline" id="formID">
                        <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doLogout()} type="button" id="signUpBtn">Sign Out</button>
                    </form>    
                </ul>
                }
            </div>
          </div>
        </header> 

        <div className="sidebar-container">
          <div style={{width: isOpen? "200px" : "60px"}} className="sidebar">
            {
              menuItem.map((item, index)=>(
                <NavLink  to={item.path} key={index} className="link" end>
                    <div className="icon">{item.icon}</div>
                    <div style={{display: isOpen? "block" : "none"}} className="link_text">{item.name}</div>
                </NavLink>
              ))
            }
          </div>
          <main id="main-page">{children}</main>
        </div>
      </div>
  );
};

export default Sidebar;
