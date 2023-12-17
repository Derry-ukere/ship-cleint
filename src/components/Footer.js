/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {Appdetails} from '../config';
import logoSvg from '../assets/ship4wd-logo.png';


function Footer() {
  return (
    <footer className="bg">
      <div className="container">
        <div className="row container app-py-1">
          <div className="col l8 s12 app-mobile-center">
            <img src={Appdetails.logoSvg} style={{ height: '72px' }} />
            <h3 style={{ marginTop: '0px', marginBottom: '10px' }}>Ship4wrd</h3>
            <p>
              <span className="material-icons notranslate">mail</span>support@ship4wd.com
            </p>
          </div> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;
