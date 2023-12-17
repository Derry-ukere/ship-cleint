/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React from 'react';
import Countdown from 'react-countdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams, Link } from 'react-router-dom';

// redux
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { useDispatch, useSelector } from '../../redux/store';
import { getDeposit } from '../../redux/slices/deposit/getDeposit';

const ComfirmDeposit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { cyptoAmount, walletId, id,qrCode } = useSelector((state) => state.getDepositReducer);
  const [walletAddress, setWlletId] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [code, setCode] = React.useState('')

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  React.useEffect(() => {
    dispatch(getDeposit(params.id));
  }, [dispatch, params]);

  React.useEffect(() => {
    if (walletId) {
      setAmount(cyptoAmount);
      setWlletId(walletId);
      setCode(qrCode)
    }
  }, [cyptoAmount, walletId,]);

  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Copied !
          </Alert>
        </Snackbar>
        <div className="fade-appear-done fade-enter-done">
          <section className="row center">
            <div className="col l4 offset-l4 s12">
              <div className="card-panel">
                <p>SEND {amount}</p>
                <p>TO THE WALLET ADDRESS BELOW OR SCAN THE QR CODE WITH YOUR WALLET APP</p>
                <div className="input-field">
                  <CopyToClipboard text={walletAddress} onCopy={() => setOpen(true)}>
                    <i className="material-icons prefix">content_copy</i>
                  </CopyToClipboard>

                  <input type="text" defaultValue={walletAddress} style={{ textAlign: 'center' }} />
                </div> 
                <img
                  src={`${code}`}
                  alt={walletAddress}
                  style = {{width : "250px"}}
                />
                <br />
                <br />
                <Countdown date={Date.now() + 3000000} />,<p>Awaiting Payment</p>
                <br />
                <Link className="btn" to={`/user/deposits/upload/${id}`}>
                  UPLOAD PAYMENT PROOF
                </Link>
                <br />
                <br />
                <Link className="btn btn-secondary" to="/user/deposits/list">
                  WAIT FOR CONFIRMATION
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ComfirmDeposit;
