import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardFooter = () => {
  const { pathname } = useLocation();
  const isActive = pathname === '/user'
  const miningActive = pathname === '/user/mining'

  return (
    <div>
      <div className="fixed-footer mobile-bg">
        <ul className="tabs">
          <li className="tab col s6">
            <Link to="/user" className= {isActive ? 'active' : ''} >
              <span className="material-icons notranslate">assessment</span>
              <span>Trading</span>
            </Link>
          </li>
          <li className="tab col s6">
            <Link className= {miningActive ? 'active' : ''} to="/user/mining">
              <span className="material-icons notranslate">copyright</span>
              <span>Mining</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
  
} 
export default DashboardFooter;
