/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import * as React from 'react';
import {Appdetails} from '../config';


export default function TemporaryDrawer({ state, setState}) {
  const close = () => {
    setState(false)
  }

  return (
    <div >
      {
        state && (
          <div >
            <ul className="sidenav" id="mobile-demo" style={{ transform: 'translateX(0%)' }}>
              <li onClick={close}>
                <div className="user-view" >
                  <div className="background">
                    <img
                      src={Appdetails.logo}
                      className="responsive-img"
                      alt="logo"
                      style={{ height: '19vh' }}
                    />
                  </div>
                </div>
              </li>
              <li className="no-padding">
                <ul>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/">
                      <span className="material-icons notranslate">home</span>Home
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/signin">
                      <span className="material-icons notranslate">person_outline</span>Sign In
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/signup">
                      <span className="material-icons notranslate">person_add</span>Sign Up
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/contact">
                      <span className="material-icons notranslate">mail_outline</span>Contact Us
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/about-us">
                      <span className="material-icons notranslate">people</span>About Us
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/privacy-policy">
                      <span className="material-icons notranslate">lock_open</span>Privacy Policies
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/terms-of-service">
                      <span className="material-icons notranslate">folder_open</span>Terms of Service
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/forex-trading">
                      <span className="material-icons notranslate">wysiwyg</span>Forex Trading
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/stocks-trading">
                      <span className="material-icons notranslate">insert_chart_outlined</span>Stocks Trading
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/crypto-trading">
                      <span className="material-icons notranslate">copyright</span>Crypto Trading
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/options-trading">
                      <span className="material-icons notranslate">donut_large</span>Options Trading
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/copy-expert-traders">
                      <span className="material-icons notranslate">content_copy</span>Copy Expert Traders
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/about-mining">
                      <span className="material-icons notranslate">copyright</span>About Mining
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/bitcoin-mining">
                      <span className="material-icons notranslate">copyright</span>Bitcoin Mining
                    </Link>
                  </li>
                  <li onClick={close}>
                    <Link className="sidenav-close" to="/pages/dogecoin-mining">
                      <span className="material-icons notranslate">copyright</span>Dogecoin Mining
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )
      }
        
    </div>
  );
}
