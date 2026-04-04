import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ brandName, links }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>{brandName}</h2>
      </div>
      <ul className="navbar-links">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.url}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;