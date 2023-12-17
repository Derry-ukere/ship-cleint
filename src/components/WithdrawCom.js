/* eslint-disable react/prop-types */
import React from 'react';

const Deposit = ({ amount, destination, }) => (
  <li className="collection-item app-py-1">
    <div className="app-flex" style={{ alignItems: 'center' }}>
      <div style={{ flex: '3.5 1 0%' }}>
        <span>Amount : ${amount}</span>
        <p style={{margin : 0}}>
         From:  {destination}
        </p>
        {/* <p  >
         Wallet Address:  {address}
        </p> */}
      </div>
      {/* <div >
        {status ? 'Approved' : 'Pending'}
      </div> */}
    </div>
  </li>
);

export default Deposit;
