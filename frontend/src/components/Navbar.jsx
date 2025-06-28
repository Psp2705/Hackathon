import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">InsureWise</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Insurance Q&A</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/compare">Policy Comparison</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recommend">Personalized Suggestion</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
