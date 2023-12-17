/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import useAuth from '../../hooks/useAuth';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { registerTrade } from '../../redux/slices/trades/registerTrade';
import { fetchPersonalTrades } from '../../redux/slices/trades/personalTrades';


const tradeImageUrl = 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-dashusd.img.svg?alt=media&token=35cc0066-a30c-4c8a-8d1a-7337db7488b9'

const TraderRoom = () => {
  const dispatch = useDispatch();
  const { buying, selling,success } = useSelector((state) => state.registerTradeReducer);
  const { personalTrades } = useSelector((state) => state.personalTrades);

  const [error, setError] = React.useState(false);
  const [tradeState, setTradeState] = React.useState([]);
  const [amount, setAmount] = React.useState(100);
  const [tradeTime, setTradeTime] = React.useState(3);

  const { deposits, user } = useAuth();

  useEffect(() => {
    if (success){
      console.log('success', success);
    }
  }, [buying,selling])


  useEffect(() => {
   dispatch(fetchPersonalTrades())
  }, [])

  const trade = (position) => {
    if ((deposits === 0)) {
      setError(true)
      return
    }
    const options = {
      amountEntered: amount,
      positions: position,
      currencyPair: 'BTC/USDT',
      traderId: user.id,
      imgUrl: tradeImageUrl,
      userId: user.id,
    }
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
    const optionState = {
      amount,
      positions: position,
      currencyPair: 'BTC/USDT',
      traderId: user.id,
      imgUrl: tradeImageUrl,
      userId: user.id,
      status : 'PENDING',
      day: d.getDate(),
      month :months[d.getMonth()]
    }
    dispatch(registerTrade(options))
    setTradeState([...tradeState, optionState])
  }

  const handleCloseTwo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  useEffect(() => {
    if (personalTrades) {
      const copiedTrade = personalTrades.map((trade) => ({
        positions: trade.positions,
        currencyPair: trade.currencyPair,
        tradernAME: trade.tradernAME,
        status: trade.status,
        imageUrl: trade.imageUrl,
        month:trade.month,
        day : trade.day,
        amount : trade.amount
      }))
      setTradeState([...copiedTrade])
    }
  }, [personalTrades])


  return (
    <div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleCloseTwo}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseTwo} severity="error" sx={{ width: '100%' }}>
          Deposit account before you take a trade !
        </Alert>
      </Snackbar>

      <div>
        <div className="row">
          <div className="col l1 s12 center hide-on-med-and-down">
            <ul>
              <li className="tab">
                <Link to="/user">
                  <br />
                  <br />
                  <span className="material-icons notranslate">home</span>
                  <br />
                  HOME
                  <br />
                  <br />
                </Link>
              </li>
              <br />
              <li className="tab">
                <Link className="active" to="/user/ptraderoom">
                  <br />
                  <span className="material-icons notranslate">access_time</span>
                  <br />
                  BINARY OPTIONS
                  <br />
                </Link>
              </li>
              <br />
              <br />
            </ul>
          </div>
          <div className="col l11 s12">
            <div className="row ">
              <div className="col l5 hide-on-med-and-down">
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="market" className="browser-default">
                    <option value="Crypto">Crypto (40)</option>
                    <option value="Currencies">Currencies (43)</option>
                    <option value="Stocks">Stocks (82)</option>
                  </select>
                </div>
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="symbol" className="browser-default">
                    <option value="HITBTC:AAVEUSD">BTC/USDT</option>
                  </select>
                </div>
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="level" className="browser-default">
                    <option value="Simple">Simple</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
              </div>
              <div className="col l2 offset-l1 s6 pc-right app-line">
                <h3 style={{ display: 'inline-block' }}>
                  <div>${deposits}</div>
                </h3>
              </div>
              <div className="col l2 s6 pc-right app-line hide-on-med-and-down">
                <h3 className="notranslate" style={{ display: 'inline-block' }}>
                  ${deposits}
                </h3>
              </div>
              <div className="col l2 s6 app-line" style={{ textAlign: 'right' }}>
                <Link to="/user" style={{ display: 'inline-block' }}>
                  <span
                    className="material-icons notranslate"
                    style={{ fontSize: '30px', color: 'rgb(137, 129, 129)' }}
                  >
                    home
                  </span>
                </Link>
                <Link
                  className="btn "
                  to="/user/deposits/crypto"
                  style={{ paddingLeft: '1.8rem', paddingRight: '1.8rem' }}
                >
                  Deposit
                </Link>
              </div>
            </div>
            <div className="row app-line hide-on-large-only">
              <div className="col l1 s4">
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="market" className="browser-default">
                    <option value="Crypto">Crypto (40)</option>
                    <option value="Currencies">Currencies (43)</option>
                    <option value="Stocks">Stocks (82)</option>
                  </select>
                </div>
              </div>
              <div className="col l1 s4">
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="symbol" className="browser-default">
                    <option value="HITBTC:AAVEUSD">Aave</option>
                    <option value="HITBTC:ADAUSD">Cardano</option>
                    <option value="HITBTC:ALGOUSD">Algorand</option>
                    <option value="HITBTC:ATOMUSD">Cosmos</option>
                    <option value="HITBTC:BCHUSD">Bitcoin Cash</option>
                  </select>
                </div>
              </div>
              <div className="col l2 s4 ">
                <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                  <select id="level" className="browser-default">
                    <option value="Simple">Simple</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col l4 s12 hide-on-med-and-down">
                <div className="list-height">

                  <ul className="collection">
                    {
                      !tradeState || tradeState === [] ? (
                        <li className="collection-item app-py-2">
                          <p id="no-data" style={{ textAlign: 'center' }}>
                            <span className="app-font-normal">NO DATA</span>
                          </p>
                        </li>
                      ) :
                      tradeState.map((trade, index) => (
                          <li className="collection-item" style={{ cursor: 'pointer', paddingLeft: '0px', paddingRight: '0px' }} key={index}>
                            <div className="row">
                              <div className="col l2 s2">
                                <center>{trade.month}<br /><span style={{ fontSize: '23px' }}>{trade.day}</span></center>
                              </div>
                              <div className="col l1 s1">
                                <div className="app-trade-icon-container"><img src={trade.imageUrl} alt='' className="app-trade-icon" /></div>
                              </div>
                              <div className="col l6 s6">{trade.positions} {trade.currencyPair}<br />{trade.tradernAME}</div>
                              <div className="col l3 s3"><span style={{ color: trade.status === 'WON' ? 'green' : trade.status === 'PENDING' ? 'grey' : 'red' }}>${trade.amount}</span></div>
                            </div>
                          </li>
                        ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col l6 s12 m10 chart-height">
                <div className="tradingview-widget-container" style={{ height: '99%' }}>
                  <div id="tradingview_ec926" style={{ height: '100%' }}>
                    <div
                      id="tradingview_c2a9e-wrapper"
                      style={{
                        position: 'relative',
                        boxSizing: 'content-box',
                        width: '100%',
                        height: '100%',
                        margin: '0 auto !important',
                        padding: '0 !important',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif',
                      }}
                    >
                      <div
                        style={{ width: '100%', height: '100%', background: 'transparent', padding: '0 !important' }}
                      >
                        
                        <iframe
                          id="tradingview_c2a9e"
                          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_c2a9e&symbol=BTCUSDT&interval=1&range=1D&hidesidetoolbar=0&saveimage=1&toolbarbg=f4f7f9&studies=%5B%5D&theme=dark&style=3&timezone=Africa%2FLagos&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=springtrading.live&utm_medium=widget_new&utm_campaign=chart&utm_term=HITBTC%3ABTCUSD"
                          style={{ width: '100%', height: '100%', margin: '0 !important', padding: '0 !important' }}
                          frameBorder={0}
                          scrolling="yes"
                          allowFullScreen
                          title=" Technical Analysis"
                        />
                      </div> 
                    </div>
                  </div>
                  <div className="tradingview-widget-copyright" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="col l2 s12 m2 center"> 
                <form>
                  <div className="hide-on-large-only">
                    <LoadingButton type="button" className="green btn btn-full btn-large" onClick={() => trade('UP')} loading={buying}>
                      BUY
                    </LoadingButton>
                    <LoadingButton type="button" className="red btn btn-full btn-large" onClick={() => trade('DOWN')} loading={selling}>
                      SELL
                    </LoadingButton>
                  </div>
                  <div className="input-field">
                    <label className="active">time (minutes)</label>
                    <input min={1} max={59} id="time" type="number" value={amount} style={{ textAlign: 'center' }} onChange={(e) => setAmount(e.target.value)} />
                  </div>

                  <br />
                  <div className="input-field">
                    <label className="active">amount</label>
                    <input min={100} id="time" type="number" value={tradeTime} style={{ textAlign: 'center' }} onChange={(e) => setTradeTime(e.target.value)} />
                  </div>
                  <br />
                  <br />
                  <div className="hide-on-med-and-down">
                    <LoadingButton type="button" className="green btn btn-full btn-large" onClick={() => trade('UP')} loading={buying}>
                      BUY
                    </LoadingButton>
                    <LoadingButton type="button" className="red btn btn-full btn-large" onClick={() => trade('DOWN')} loading={selling}>
                      SELL
                    </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-footer bg hide-on-large-only">
          <ul className="tabs">
            <li className="tab">
              <Link title="Home" to="/user">
                <span className="material-icons notranslate">home</span>
                <span className="hide-on-small-only">Home</span>
              </Link>
            </li>
            <li className="tab">
              <Link title="Binary Options" className="active" to="/user/ptraderoom">
                <span className="material-icons notranslate">access_time</span>
                <span className="hide-on-small-only">Binary Options</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TraderRoom;
