/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom'
import { Alert } from '@mui/material';

// comp
import DetailsTable from '../../components/TradersTable';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAllWithdrawals } from '../../redux/slices/withdrawals/getWithdrawals';

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { allWithdrawals, error } = useSelector((state) => state.withdrawalsReducer);

  React.useEffect(() => {
    dispatch(getAllWithdrawals())
  }, [])

  return (
    <main className="container" style={{ height: '100vh' }}>
      
      <div className="fade-appear-done fade-enter-done">
        <br />
        <center>
          <Link className="btn" to="/user/withdrawals/new">
            NEW WITHDRAWAL REQUEST
          </Link>
        </center>
        {
          error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )
        }
        {
          !allWithdrawals ? (
            <ul className="collection">
              <li className="collection-item app-py-2">
                <p id="no-data" style={{ textAlign: 'center' }}>
                  <span className="app-font-normal">NO WITHDRAWALS YET</span>
                </p>
              </li>
            </ul>
          ) : (
            <DetailsTable users={allWithdrawals} />
          )
        }
        <div className="fixed-action-btn" >
          <Link title="New Withdrawal" className="btn-floating btn-large" id="btn" to="/user/withdrawals/new">
            <i className="large material-icons notranslate">add</i>
          </Link>
          <div className="tap-target-wrapper" style={{ right: '-337px', bottom: '-312px', position: 'fixed' }}>
            <div className="tap-target" data-target="btn">
              <div
                className="tap-target-content"
                style={{ width: '456px', height: '400px', inset: '0px', padding: '56px', verticalAlign: 'bottom' }}
              >
                <h5>New Withdrawal</h5>
              </div>
            </div>
            <div className="tap-target-wave" style={{ top: '344px', left: '344px', width: '112px', height: '112px' }}>
              <a
                title="New Withdrawal"
                className="btn-floating btn-large tap-target-origin"
                href="/user/withdrawals/new"
              >
                <i className="large material-icons notranslate">add</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Withdrawal;
