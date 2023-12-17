/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// _mock_
import { getWalletResp, Destination } from '../../db_design';
import { usdToCoin } from '../../utils/cureency-converter';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { depositFunds } from '../../redux/slices/deposit/depositFunds';

import useAuth from '../../hooks/useAuth';


const FundAccount = () => {
  const params = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {  depositComplete, error } = useSelector((state) => state.fundAccountReducer);
  const { data } = getWalletResp;
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [amountEntered, setAmount] = React.useState('');
  const [destinantion, setDestinantion] = React.useState('');
  const uuid = uuidv4();
  const [isLoading, setIsloading] = React.useState(false);
  const depositId = uuid;

  React.useEffect(() => {
    setAmount(params.amount);
  }, [params, depositComplete]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleAMountChnge = (event) => {
    setAmount(event.target.value);
  };
  const handleDestinantionChange = (event) => {
    setDestinantion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true)
    const paymentAddress = paymentMethod.split(' ')[0];
    const paymemnetCoin = paymentMethod.split(' ')[2];

    const amountInCrypto = await usdToCoin(amountEntered, paymemnetCoin);

    
    const QrCode = data.filter((eachData) => eachData.tag === paymentAddress )
    
    const options = {
      amountEntered,
      paymemnetCoin,
      amountInCrypto,
      paymentAddress,
      destinantion,
      depositId,
      user : user.displayName,
      qrCode : QrCode[0].QrCode
    };

    const depositedId = await dispatch(depositFunds(options));
    setIsloading(false)
    if (depositedId) {
      navigate(`/user/deposits/${depositId}`);
    }
  };

  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
          <center>
            <p style={{ fontWeight: 'bold' }}>FUND YOUR ACCOUNT</p>
            <p>
              <Link to="/user/deposits/pricing" style={{ fontSize: '19px' }}>
                VIEW PRICING
              </Link>
            </p>
            <p>
              <Link to="/user/deposits/buy" style={{ fontSize: '19px' }}>
                BUY CRYPTO NOW
              </Link>
            </p>
            <br />
          </center>
          <section className="row">
            <div className="col l4 offset-l4 s12">
              <div className="card-panel">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  {error && <Alert severity="error">{error}</Alert>}
                  <div>
                    <div className="input-field">
                      <span className=" prefix">USD</span>
                      <label className="active" htmlFor="amount">
                        amount
                      </label>
                      <input
                        inputMode="decimal"
                        type="number"
                        id="amount"
                        min={50}
                        step="any"
                        name="amount"
                        required
                        value={amountEntered}
                        onChange={handleAMountChnge}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paymentMethod}
                        label="Select Coin"
                        onChange={handlePaymentChange}
                        required
                      >
                        {data.map((wallet) => (
                          <MenuItem key={wallet.id} value={wallet.address}>
                            {wallet.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={destinantion}
                        label="Select Coin"
                        onChange={handleDestinantionChange}
                        required
                      >
                        {Destination.map((wallet, index) => (
                          <MenuItem key={index} value={wallet.value}>
                            {wallet.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <br />
                  <div>
                <LoadingButton type="submit" variant="contained" color='info' className="btn btn-full" loading={isLoading} >
                      Proceed
                </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </section> 
        </div>
      </main>
    </div>
  );
};

export default FundAccount;
