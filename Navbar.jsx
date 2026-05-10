import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/home";
  };

  const isLoggedIn = localStorage.getItem("username");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="material-icons logo-icon">flight_takeoff</span>
        <span className="logo-text">Wanderlust</span>
      </div>
      
      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link 
              to="/home" 
              className={activeLink === 'home' ? 'active' : ''}
              onClick={() => setActiveLink('home')}
            >
              <span className="material-icons">home</span>
              <span className="link-text">Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/travels/GetAllTravels" 
              className={activeLink === 'travels' ? 'active' : ''}
              onClick={() => setActiveLink('travels')}
            >
              <span className="material-icons">explore</span>
              <span className="link-text">Travels</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={activeLink === 'about' ? 'active' : ''}
              onClick={() => setActiveLink('about')}
            >
              <span className="material-icons">info</span>
              <span className="link-text">About</span>
            </Link>
          </li>
          
          {isLoggedIn ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={activeLink === 'dashboard' ? 'active' : ''}
                  onClick={() => setActiveLink('dashboard')}
                >
                  <span className="material-icons">dashboard</span>
                  <span className="link-text">Dashboard</span>
                </Link>
              </li>
              {/* <li>
                <Link 
                  to="/profile" 
                  className={activeLink === 'profile' ? 'active' : ''}
                  onClick={() => setActiveLink('profile')}
                >
                  <span className="material-icons">account_circle</span>
                  <span className="link-text">Profile</span>
                </Link>
              </li> */}
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  <span className="material-icons">logout</span>
                  <span className="link-text">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/auth/login" 
                  className={activeLink === 'login' ? 'active' : ''}
                  onClick={() => setActiveLink('login')}
                >
                  <span className="material-icons">login</span>
                  <span className="link-text">Login</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth/register" 
                  className="register-btn"
                  onClick={() => setActiveLink('register')}
                >
                  <span className="material-icons">person_add</span>
                  <span className="link-text">Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="material-icons">{menuOpen ? 'close' : 'menu'}</span>
      </div>
    </nav>
  );
};

export default Navbar;

