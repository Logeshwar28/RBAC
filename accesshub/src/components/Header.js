import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='home-dashboard'>
      <div className='header-content'>
        <img className='logo' alt='Logo' src='/Access Logo.png' />
        <h1 className='title'>Access-Hub</h1>
        <nav className='nav-bar'>
          <ul>
            <li><Link to="/" className='home-button'>Home</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
