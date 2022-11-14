import React, { useState, useEffect, useCallback, Children } from "react";
import { NavLink, RouteProps } from "react-router-dom";

// Import CSS
import './Sidebar.css';

// Import for Icons
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

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
      path:"about",
      name:"About",
      icon:<FontAwesomeIcon icon={["fas", "circle-info"]} />
    },
    {
      path:"search",
      name:"Search",
      icon:<FontAwesomeIcon icon={["fas", "search"]} />
    },
    {
      path:"create-track",
      name:"Create Track",
      icon:<FontAwesomeIcon icon={["fas", "plus"]} />
    },
  ]

  return (
    <div className="container" id="sidebar-container">
      <div style={{width: isOpen? "300px" : "60px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{display: isOpen? "block" : "none"}} className="logo">BrainBeats</h1>
          <div style={{marginLeft: isOpen? "50px" : "0px"}} className="bars">
            <FontAwesomeIcon icon={["fas", "bars"]} onClick={toggle} />
          </div>
        </div>
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
  );
};

export default Sidebar;
