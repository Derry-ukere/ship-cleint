/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';

const Deposits = () => {
  return (
    <main className="container" style={{ height: '100vh' }}>
      <br />
      <div className="fade-appear-done fade-enter-done">
        <div className="container row">
          <div className="col l8 s12">
            <center>
              <Link className="btn " to="/user/deposits/crypto">
                NEW DEPOSIT
              </Link>
            </center>
            <ul className="collection">
              <li className="collection-item app-py-2">
                <p id="no-data" style={{ textAlign: 'center' }}>
                  <span className="app-font-normal">NO DEPOSIT YET</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="col l4 s12">
            <ul className="collection">
              <li className="collection-item app-py-2 app-px-2">
                <center>
                  <img
                    src="/assets/images/site/UserVector2.png"
                    className="responsive-img"
                    style={{ maxHeight: '30vh' }}
                  />
                  <h2 style={{ margin: '0px', padding: '0px' }}>Deposit</h2>
                </center>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Deposits;
