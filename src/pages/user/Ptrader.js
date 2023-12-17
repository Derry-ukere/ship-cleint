/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable arrow-body-style */
import React from 'react';
import {Link} from 'react-router-dom'

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import useAuth from '../../hooks/useAuth';

const Ptrader = () => {
  const [error, setError] = React.useState(false);
  const { deposits,profits } = useAuth();

   console.log('profit',profits)
   console.log('deposits',deposits)

  const upTrade = () => {
    if((deposits === 0)){
      setError(true)
      return
    }
    console.log('up')
   
  }
  const downTrade = () => {
    if((deposits === 0)){
      setError(true)
      return
    }
    console.log('up')
  }
  const handleCloseTwo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setError(false);
  };
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
                    <option value="HITBTC:AAVEUSD">Aave</option>
                    <option value="HITBTC:ADAUSD">Cardano</option>
                    <option value="HITBTC:ALGOUSD">Algorand</option>
                    <option value="HITBTC:ATOMUSD">Cosmos</option>
                    <option value="HITBTC:BCHUSD">Bitcoin Cash</option>
                    <option value="HITBTC:BNBUSD">BNB</option>
                    <option value="HITBTC:BTCUSD">Bitcoin</option>
                    <option value="HITBTC:BTTUSD">BitTorrent</option>
                    <option value="HITBTC:CAKEUSD">PanCake Swap</option>
                    <option value="HITBTC:COMPUSD">Compound</option>
                    <option value="HITBTC:DASHUSD">Dash</option>
                    <option value="HITBTC:DOGEUSD">Dogecoin</option>
                    <option value="HITBTC:DOTUSD">Polkadot</option>
                    <option value="HITBTC:EOSUSD">EOS</option>
                    <option value="HITBTC:ETCUSD">ETH Classic</option>
                    <option value="HITBTC:ETHUSD">Ethereum</option>
                    <option value="HITBTC:FILUSD">Filecoin</option>
                    <option value="HITBTC:FTTUSD">FTX Token</option>
                    <option value="HITBTC:ICPUSD">Internet Computer</option>
                    <option value="HITBTC:KLAYUSD">Klaytn</option>
                    <option value="HITBTC:KSMUSD">Kusama</option>
                    <option value="HITBTC:LINKUSD">Chainlink</option>
                    <option value="HITBTC:LTCUSD">Litecoin</option>
                    <option value="HITBTC:LUNAUSD">Terra Luna</option>
                    <option value="HITBTC:MATICUSD">Polygon</option>
                    <option value="HITBTC:MKRUSD">Maker</option>
                    <option value="HITBTC:NEOUSD">NEO</option>
                    <option value="HITBTC:RUNEUSD">THORChain</option>
                    <option value="HITBTC:SHIBUSD">Shiba Inu</option>
                    <option value="HITBTC:SOLUSD">Solana</option>
                    <option value="HITBTC:THETAUSD">Theta</option>
                    <option value="HITBTC:TRXUSD">TRON</option>
                    <option value="HITBTC:UNIUSD">Uniswap</option>
                    <option value="HITBTC:XLMUSD">Stellar</option>
                    <option value="HITBTC:XMRUSD">Monero</option>
                    <option value="HITBTC:XTZUSD">Tezos</option>
                    <option value="HITBTC:ZECUSD">ZCash</option>
                    <option value="HITBTC:BSVUSD">Bitcoin SV</option>
                    <option value="HITBTC:CROUSD">Crypto.org Coin</option>
                    <option value="HITBTC:LEOUSD">Unus sed leo</option>
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
                    <option value="HITBTC:BNBUSD">BNB</option>
                    <option value="HITBTC:BTCUSD">Bitcoin</option>
                    <option value="HITBTC:BTTUSD">BitTorrent</option>
                    <option value="HITBTC:CAKEUSD">PanCake Swap</option>
                    <option value="HITBTC:COMPUSD">Compound</option>
                    <option value="HITBTC:DASHUSD">Dash</option>
                    <option value="HITBTC:DOGEUSD">Dogecoin</option>
                    <option value="HITBTC:DOTUSD">Polkadot</option>
                    <option value="HITBTC:EOSUSD">EOS</option>
                    <option value="HITBTC:ETCUSD">ETH Classic</option>
                    <option value="HITBTC:ETHUSD">Ethereum</option>
                    <option value="HITBTC:FILUSD">Filecoin</option>
                    <option value="HITBTC:FTTUSD">FTX Token</option>
                    <option value="HITBTC:ICPUSD">Internet Computer</option>
                    <option value="HITBTC:KLAYUSD">Klaytn</option>
                    <option value="HITBTC:KSMUSD">Kusama</option>
                    <option value="HITBTC:LINKUSD">Chainlink</option>
                    <option value="HITBTC:LTCUSD">Litecoin</option>
                    <option value="HITBTC:LUNAUSD">Terra Luna</option>
                    <option value="HITBTC:MATICUSD">Polygon</option>
                    <option value="HITBTC:MKRUSD">Maker</option>
                    <option value="HITBTC:NEOUSD">NEO</option>
                    <option value="HITBTC:RUNEUSD">THORChain</option>
                    <option value="HITBTC:SHIBUSD">Shiba Inu</option>
                    <option value="HITBTC:SOLUSD">Solana</option>
                    <option value="HITBTC:THETAUSD">Theta</option>
                    <option value="HITBTC:TRXUSD">TRON</option>
                    <option value="HITBTC:UNIUSD">Uniswap</option>
                    <option value="HITBTC:XLMUSD">Stellar</option>
                    <option value="HITBTC:XMRUSD">Monero</option>
                    <option value="HITBTC:XTZUSD">Tezos</option>
                    <option value="HITBTC:ZECUSD">ZCash</option>
                    <option value="HITBTC:BSVUSD">Bitcoin SV</option>
                    <option value="HITBTC:CROUSD">Crypto.org Coin</option>
                    <option value="HITBTC:LEOUSD">Unus sed leo</option>
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
                    <li className="collection-item app-py-2">
                      <p id="no-data" style={{ textAlign: 'center' }}>
                        <span className="app-font-normal">NO OPEN POSITIONS</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l6 s12 m10 chart-height">
                <div className="tradingview-widget-container" style={{ height: '99%' }}>
                  <div id="tradingview_ec926" style={{ height: '100%' }}>
                    <div
                      id="tradingview_0272b-wrapper"
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
                          id="tradingview_0272b"
                          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_0272b&symbol=HITBTC%3ABTCUSD&interval=1&range=1D&hidesidetoolbar=0&saveimage=1&toolbarbg=f4f7f9&studies=%5B%5D&theme=light&style=3&timezone=Africa%2FLagos&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=springtrading.live&utm_medium=widget_new&utm_campaign=chart&utm_term=HITBTC%3ABTCUSD"
                          style={{ width: '100%', height: '100%', margin: '0 !important', padding: '0 !important' }}
                          frameBorder={0}
                          scrolling="no"
                          allowFullScreen
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
                    <button type="button" className="green btn btn-full btn-large" onClick={upTrade}>
                      UP
                    </button>
                    <button type="button" className="red btn btn-full btn-large" onClick={downTrade}>
                      DOWN
                    </button>
                  </div>
                  <div className="input-field">
                    <label className="active">time (minutes)</label>
                    <input min={1} max={59} id="time" type="number" defaultValue={10} style={{ textAlign: 'center' }} />
                  </div>
                  <small>LEVERAGE </small>
                  <br />
                  <span>0 (10 MAX)</span>
                  <br />
                  <br />
                  <small>TRADE VALUE</small>
                  <br />
                  <span>$4,023.91</span>
                  <br />
                  <br />
                  <div className="hide-on-med-and-down">
                    <button type="submit" className="green btn btn-full btn-large">
                      UP
                    </button>
                    <button type="submit" className="red btn btn-full btn-large">
                      DOWN
                    </button>
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

export default Ptrader;
