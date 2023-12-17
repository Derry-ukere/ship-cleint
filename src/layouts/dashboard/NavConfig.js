/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';

import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NavConfig = () => {
  const { logout, user } = useAuth();
  const { email, displayName } = user;

  return (
    <div>
      <ul className="sidenav" id="mobile-demo" style={{ transform: 'translateX(0%)' }}>
        <li>
          <div className="user-view">
            <div className="background">
              <img src="/assets/images/site/Office.jpg" />
            </div>
            <Link to="#user">
              <img className="circle" src="/assets/images/site/camera.png" />
            </Link>
            <span className="white-text name">{`${displayName}`}</span>
            <span className="white-text email">{email}</span>
          </div>
        </li>
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li className="active">
              <div className="collapsible-body" style={{ display: 'block' }}>
                <ul>
                  <li>
                    <Link className="sidenav-close" to="/">
                      <span className="material-icons notranslate">home</span>Home
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/user/deposits/list">
                      <span className="material-icons notranslate">input</span>Deposits
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/user/account">
                      <span className="material-icons notranslate">account_circle</span>My Account
                    </Link>
                  </li>

                  <li>
                    <Link className="sidenav-close" to="/user/withdrawals">
                      <span className="material-icons notranslate">payments</span>Withdrawals
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/user/deposits/buy">
                      <span className="material-icons notranslate">shopping_bag</span>Buy Crypto
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="sidenav-close" onClick={() => logout()}>
                      <span className="material-icons notranslate">power_settings_new</span>Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NavConfig;
