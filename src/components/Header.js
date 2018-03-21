import React from "react";
import { Link } from "react-router-dom";
const Header = ({ title }) => (
  <div className="container">
    <h1>{title}</h1>
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/search">Search</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Mine">Mine</Link>
    </li>
  </div>
);

export default Header;
