import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Auth } from 'aws-amplify';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const handleLogOut = async (event) => {
    event.preventDefault();

    try{
      await Auth.signOut()
    }catch(error) {
      console.log(error)
    }
    props.auth.configAuthState(false);
    props.auth.configUser({});
  }

  const handleMobileLogOut = async (event) => {
    event.preventDefault();

    try{
      await Auth.signOut()
    }catch(error) {
      console.log(error)
    }

    closeMobileMenu();

    props.auth.configAuthState(false);
    props.auth.configUser({});
  }

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          TRVL V1
          <i className='fab fa-typo3' />
        </Link>
        {props.auth.isAuthenticated && props.auth.user && (
          <p>
            Hi {props.auth.user.username}!
          </p>
        )}
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services
            </Link>
          </li>
          {!props.auth.isAuthenticated && (<li className='nav-item'>
            <Link
              to='/login'
              className='nav-links'
              onClick={closeMobileMenu}>
              Member Login
            </Link>
          </li>)}
          {props.auth.isAuthenticated ?  
          <li>
            <Link
              to='/'
              className='nav-links-mobile'
              onClick={handleMobileLogOut}>
              Log Out
            </Link>
          </li>
          :
          <li>
            <Link
              to='/signup'
              className='nav-links-mobile'
              onClick={closeMobileMenu}>
              Sign Up
            </Link>
          </li>}
        </ul>
        {button && (props.auth.isAuthenticated ?
          <Button buttonStyle='btn--outline' onClick={handleLogOut}>Log Out</Button>:
          <Button buttonStyle='btn--outline'>SIGN UP</Button>)}
      </nav>
    </>
  );
}

export default Navbar;
