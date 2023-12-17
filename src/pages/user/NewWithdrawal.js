/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import ReactLoading from 'react-loading';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import useAuth from '../../hooks/useAuth';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { withdrawFunds } from '../../redux/slices/withdrawals/withdrawFunds';


const NewWithdrawal = () => {
  const { withdrawalComplete, error: withdrawalError, isLoading } = useSelector((state) => state.withdrawFundsReducer);
  const { balance, user } = useAuth();
  // const [error, setError] = React.useState(false);
  const [from, setFrom] = React.useState("Trading");
  const [paymentMethod, setPaymentMethod] = React.useState("Bitcoin");
  const [amount, setAmount] = React.useState(null);
  const [walletAddress, setWalletAddress] = React.useState(null);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault()
    const options = {
      from,
      amount,
      paymentMethod,
      walletAddress,
      clientName: user.displayName,
    }
    dispatch(withdrawFunds(options, balance, amount)).then(() => {
      setAmount("")
      setWalletAddress("")
    })
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Snackbar
        open={withdrawalError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {withdrawalError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={withdrawalComplete}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Withdrawal request has been registered !
        </Alert>
      </Snackbar>
      <div className="fade-appear-done fade-enter-done">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <div className="card-panel">
              <center>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="input-field"><label className="active">from</label>
                    <select id="from" className="browser-default padded-select" value={from} onChange={(e) => setFrom(e.target.value)}>
                      <option value={"Trading"} selected>Trading ${balance}</option>
                      <option value={'Mining'}> Mining ${balance} </option>
                    </select>
                  </div>
                  <div className="input-field"><label className="active">payment method</label>
                    <select id="payment_method" className="browser-default padded-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="Bitcoin" selected>Bitcoin</option>
                      <option value="Ethereum">Ethereum</option>
                      <option value="USDT Tether">USDT Tether</option>
                      <option value="Binancecoin">Binancecoin</option>
                    </select>
                  </div>
                  <div>
                    <div className="input-field"><span className=" prefix">USD</span><label className="active" htmlFor="amount">amount</label><input inputMode="decimal" type="number" id="amount" min max step="any" name="amount" required value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
                  </div>
                  <div className="input-field"><input type="text" id="wallet_address" name="wallet_address" inputMode="text" required value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} /><label className="active" htmlFor="wallet_address">wallet address</label></div><br />
                  <div>
                    {isLoading ? (
                      <div style={{ marginLeft: 130 }}>
                        <ReactLoading color="#107bea" />
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-full">
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewWithdrawal