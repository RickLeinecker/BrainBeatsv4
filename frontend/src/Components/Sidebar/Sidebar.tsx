import React, { useState, useEffect, useCallback } from "react";

const Sidebar = () => {
  return (
    <div className="sidebar-container" id="sidebarID"> 
      {/* Sidebar */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
          <strong>BS</strong>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fas fa-home"></i>
              Home
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="#">Home 1</a>
              </li>
              <li>
                <a href="#">Home 2</a>
              </li>
              <li>
                <a href="#">Home 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-briefcase"></i>
              About
            </a>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fas fa-copy"></i>
              Pages
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
              <li>
                <a href="#">Page 3</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
