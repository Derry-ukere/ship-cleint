/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Deposit = ({ amount, btcAmount, destination, status, id }) => (
  <li className="collection-item app-py-1">
    <br />
    <div className="app-flex" style={{ alignItems: 'center' }}>
      <div style={{ flex: '0.7 1 0%' }}>
        <center>
          <p className="app-trading-month">Trading</p>
        </center>
      </div>
      <div style={{ flex: '3.5 1 0%' }}>
        <span>${amount}</span>
        <br />
        <span>{btcAmount}</span>
        <p>
          {destination} ({status})
        </p>
      </div>
      <div style={{ flex: '0.7 1 0%' }}>
        <Link to={`/user/deposits/${id}`}>PAY</Link>
      </div>
    </div>
  </li>
);

export default Deposit;
