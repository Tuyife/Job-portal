import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBookmark, FiBriefcase } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>JobBoard Portal</h1>
            <p>Find your dream job today</p>
          </Link>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
          >
            <FiHome size={18} /> Home
          </Link>
          <Link 
            to="/jobs" 
            className={`nav-link ${currentPath === '/jobs' ? 'active' : ''}`}
          >
            <FiBriefcase size={18} /> Jobs
          </Link>
          <Link 
            to="/bookmarks" 
            className={`nav-link ${currentPath === '/bookmarks' ? 'active' : ''}`}
          >
            <FiBookmark size={18} /> Bookmarks
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
