/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
// Hooks
import useAuth from '../../hooks/useAuth';

// components
import Footer from '../../components/DashboardFooter'; 
import AdminDrawer from '../../components/DashboardDrawer';

// config
import {Appdetails} from '../../config';


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState(false);


  const handleClick = () =>{
    setState(true)
  }
  const { user } = useAuth();  
  const { displayName } = user;
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
         <AdminDrawer state={state} setState ={setState}/>
          <main style={{ minHeight: '80vh' }}>
            <div className="bg bg-secondary app-image-back-1 fade-appear-done fade-enter-done">
              <div className="navbar-fixed">
                <nav className="bg">
                  <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left">
                      <li onClick={handleClick}>
                        <a data-target="mobile-demo" className="sidenav-trigger show-on-large">
                          <span className="material-icons notranslate">menu</span>
                        </a>
                      </li>
                      <li>
                        <Link to="/">
                        <b className="app-title"><img src= {Appdetails.logoHeader} alt='logo' height={'40px'}  /></b>
                        </Link>
                      </li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                      <li>
                        <Link to="/pages/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/">{displayName}</Link>
                      </li>

                      <li className="dropdown-trigger" data-target="translator">
                        <a>
                          <span className="flag-icon flag-icon-us flag-icon-rounded" />{' '}
                          <span className="hide-on-small-only">en</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </React.Fragment>
      ))}
    </div>
  );
}
