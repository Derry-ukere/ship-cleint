/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import useAuth from '../../hooks/useAuth';


// redux
import { useDispatch, useSelector } from '../../redux/store';
import { fetchUserTrades } from '../../redux/slices/trades/userTrades';



const Home = () => {
  const { deposits, balance,user, profits,withdrawal } = useAuth(); 
  const { trades } = useSelector((state) => state.userTrades);

  const dispatch = useDispatch();
  
  
  React.useEffect(() => {
    dispatch(fetchUserTrades())
  },[])


  return (
    <main className="app-py-1" style={{ height: '100vh' }}>
      <div className="fade-appear-done fade-enter-done">
        <div>
          <div>
            <div className="pc-container" style={{ margin: 'auto' }}>
              <div className="row">
                <div className="col l4 s12">
                  <div className="center">
                    <div className="row">
                      <Stack direction={'row'}>
                      <div className="col l6 s6">
                        <h3 className="notranslate" style={{ margin: '0px', padding: '0px' }}>
                          ${balance}
                        </h3>
                        <span style={{ fontSize: '10px' }}>BALANCE</span>
                      </div>
                      <div className="col l6 s6">
                        <h3 style={{ margin: '0px', padding: '0px' }}>${profits}</h3>
                        <span style={{ fontSize: '10px' }}>PROFITS</span>
                      </div>
                      <div className="col l6 s6">
                        <h3 style={{ margin: '0px', padding: '0px' }}>${deposits}</h3>
                        <span style={{ fontSize: '10px' }}>DEPOSIT</span>
                      </div>
                      <div className="col l6 s6">
                        <h3 style={{ margin: '0px', padding: '0px' }}>${withdrawal}</h3>
                        <span style={{ fontSize: '10px' }}> Withdrawals</span>
                      </div>
                      </Stack>
                    </div>
                    <br />
                    <center>
                      <progress value={Number(user.signalStrenght)} max={100} style={{ width: '80%', display: 'block' }} />
                    </center>
                    <span style={{ fontSize: '10px' }}>SIGNAL STRENGTH</span>
                    <br />
                    <br />
                  </div>
                  <div className="pc-container row center" style={{ margin: 'auto' }}>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/deposits/crypto" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(50, 167, 226)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              attach_money
                            </p>
                          </div>
                        </Link>
                        FUND ACCOUNT
                        <br />
                        <br />
                      </div>
                    </div>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/trading/traders" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(255, 135, 0)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              supervised_user_circle
                            </p>
                          </div>
                        </Link>
                        COPY EXPERTS
                        <br />
                        <br />
                      </div>
                    </div>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/trading/markets" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(34, 176, 125)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              store
                            </p>
                          </div>
                        </Link>
                        ASSET MARKETS
                        <br />
                        <br />
                      </div>
                    </div>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/trading/watchlist" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(181, 72, 198)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              star
                            </p>
                          </div>
                        </Link>
                        SAVED ASSETS
                        <br />
                        <br />
                      </div>
                    </div>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/traderoom" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(225, 85, 93)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              bar_chart
                            </p>
                          </div>
                        </Link>
                        TRADING ROOM
                        <br />
                        <br />
                      </div>
                    </div>
                    <div className="col l6 s4">
                      <div className="center">
                        <Link to="/user/ptraderoom" style={{ color: 'white' }}>
                          <div
                            style={{
                              background: 'rgb(82, 82, 152)',
                              color: 'white',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            <p
                              className="material-icons notranslate"
                              style={{ fontSize: '30px', margin: '0px', padding: '0px' }}
                            >
                              access_time
                            </p>
                          </div>
                        </Link>
                        BINARY OPTIONS
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col l8 s12">
                  <center>
                    <ul className="tabs bg">
                      <li className="tab col s6">
                        <Link to="#closed" className="active">
                          <span className="material-icons notranslate">hourglass_full</span>
                          <span>Closed</span>
                        </Link>
                      </li>
                      <li className="tab col s6">
                        <Link to="#open">
                          <span className="material-icons notranslate">hourglass_top</span>
                          <span>Active </span>
                        </Link>
                      </li>
                      <li className="indicator" style={{ left: '0px', right: '398px' }} />
                    </ul>
                  </center>
                  <div id="closed" className="active">
                    <div className="app-py-1">
                      <ul className="collection">
                        {
                          !trades || trades === [] ? (
                            <li className="collection-item app-py-2">
                            <p id="no-data" style={{ textAlign: 'center' }}>
                              <span className="app-font-normal">NO DATA</span>
                            </p>
                          </li>
                          ):
                            trades.map((trade, index) =>(
                                <li className="collection-item" style={{cursor: 'pointer', paddingLeft: '0px', paddingRight: '0px'}} key = {trade.id+index}>
                                <div className="row">
                                  <div className="col l2 s2">
                                    <center>{trade.month}<br /><span style={{fontSize: '23px'}}>{trade.day}</span></center>
                                  </div>
                                  <div className="col l1 s1">
                                    <div className="app-trade-icon-container"><img src={trade.imageUrl} alt='' className="app-trade-icon" /></div>
                                  </div>
                                  <div className="col l6 s6">{trade.positions} {trade.currencyPair}<br />{trade.tradernAME}</div>
                                  <div className="col l3 s3"><span style={{color: trade.status === 'WON' ? 'green' : trade.status === 'PENDING' ? 'grey' : 'red' }}>${trade.amount}</span></div>
                                </div>
                              </li>
                              ) )
                            }
                      </ul>
                    </div>
                  </div>
                  <div id="open" style={{ display: 'none' }}>
                    <div className="app-py-1">
                      <ul className="collection">
                        <li className="collection-item app-py-2">
                          <p id="no-data" style={{ textAlign: 'center' }}>
                            <span className="app-font-normal">NO OPEN POSITIONS</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="fixed-footer mobile-bg">
              <ul className="tabs">
                <li className="tab col s6">
                  <Link className="active" to="/user">
                    <span className="material-icons notranslate">assessment</span>
                    <span>Trading</span>
                  </Link>
                </li>
                <li className="tab col s6">
                  <Link className to="/user">
                    <span className="material-icons notranslate">copyright</span>
                    <span>Mining</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
