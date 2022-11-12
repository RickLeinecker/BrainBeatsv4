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
      path:"/about",
      name:"About",
      icon:<FontAwesomeIcon icon={["fas", "circle-info"]} />
    },
    {
      path:"/search",
      name:"Search",
      icon:<FontAwesomeIcon icon={["fas", "search"]} />
    },
    {
      path:"/create-track",
      name:"Create Track",
      icon:<FontAwesomeIcon icon={["fas", "plus"]} />
    },
  ]

  return (
    // // ====================== NEW SIDEBAR CODE ======================
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
            <NavLink to={item.path} key={index} className="link">
                <div className="icon">{item.icon}</div>
                <div style={{display: isOpen? "block" : "none"}} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main id="main-page">{children}</main>
    </div>

    // ====================== OLD SIDEBAR CODE ======================
    // <div className="sidebar-container" id="sidebarID"> 
    //   {/* Sidebar */}
    //   <nav id="sidebar">
    //     <div className="sidebar-header">
    //       <h3>Bootstrap Sidebar</h3>
    //       <strong>BS</strong>
    //     </div>

    //     <ul className="list-unstyled components">
    //       <li className="active">
    //         <a
    //           href="#homeSubmenu"
    //           data-toggle="collapse"
    //           aria-expanded="false"
    //           className="dropdown-toggle"
    //         >
    //           <i className="fas fa-home"></i>
    //           Home
    //         </a>
    //         <ul className="collapse list-unstyled" id="homeSubmenu">
    //           <li>
    //             <a href="#">Home 1</a>
    //           </li>
    //           <li>
    //             <a href="#">Home 2</a>
    //           </li>
    //           <li>
    //             <a href="#">Home 3</a>
    //           </li>
    //         </ul>
    //       </li>
    //       <li>
    //         <a href="#">
    //           <i className="fas fa-briefcase"></i>
    //           About
    //         </a>
    //         <a
    //           href="#pageSubmenu"
    //           data-toggle="collapse"
    //           aria-expanded="false"
    //           className="dropdown-toggle"
    //         >
    //           <i className="fas fa-copy"></i>
    //           Pages
    //         </a>
    //         <ul className="collapse list-unstyled" id="pageSubmenu">
    //           <li>
    //             <a href="#">Page 1</a>
    //           </li>
    //           <li>
    //             <a href="#">Page 2</a>
    //           </li>
    //           <li>
    //             <a href="#">Page 3</a>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
};

export default Sidebar;
