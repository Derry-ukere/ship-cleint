/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import React from 'react';
import {cryto, currencies ,stocks} from '../../utils/mock'
import CrytpAsserts from '../../components/CryptoAssert';

import {getAllCryproPrices} from "../../utils/cureency-converter";


const Market = () => {
  const [AssertsState, setAssertState] = React.useState(cryto)
  const [crypto, setCrypto] = React.useState([])


  React.useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const rawPrices = await getAllCryproPrices()
      setAssertState(rawPrices)
      setCrypto(rawPrices)

    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  },[])
  const handleChange = (e) => {
    if(e.target.value === "Currencies"){
      setAssertState(currencies)
    }
    if(e.target.value === "Crypto"){
      setAssertState(crypto)
    }
    if(e.target.value === "Stocks"){
      setAssertState(stocks)
    }
  }
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
          <div className="container ">
            <center>
              <div style={{ marginRight: '1px', marginTop: '4px', marginBottom: '0px', display: 'inline-block' }}>
                <select id="market" className="browser-default" onChange={handleChange}>
                  <option value="Crypto">Crypto</option>
                  <option value="Currencies">Currencies</option>
                  <option value="Stocks">Stocks</option>
                </select>
              </div>
            </center>
            <br />
            <CrytpAsserts experts={AssertsState}/>
            <br />
            <br />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Market;
