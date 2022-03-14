import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomePage from "../Homepage/Home";
import { Button } from "react-bootstrap";
import AddWidget from "../AddWidget.js";

import "./Navbar.css";

function MainNavigation() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          Dashboard
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/add-services">Services</Link>
            </li>
            <li>
              <Link to="/add-widget">Add widget</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </header>
      <HomePage />
    </>
  );
}

export default MainNavigation;
