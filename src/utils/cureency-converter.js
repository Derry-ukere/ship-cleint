/* eslint-disable no-case-declarations */
import axios from 'axios';

// eslint-disable-next-line import/no-mutable-exports

const URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,binancecoin,tether,solana&vs_currencies=usd,gbp,eur,aud';

export async function getCurrentPrices() {
  try {
    const config = {
      method: 'get',
      url: URL,
    };
    const response = await axios(config);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Registration Error', error.message);
    throw new Error(error);
  }
}

export const usdToCoin = async (usd, paymentMethod) => {
  const currentData = await getCurrentPrices();
  let amount;
  let result;

  const bnb = currentData.binancecoin.usd;
  const btc = currentData.bitcoin.usd;
  const ethereum = currentData.ethereum.usd;
  const tether = currentData.tether.usd;

  switch (paymentMethod) {
    case 'Bitcoin':
      result = usd / btc;
      amount = `${result.toFixed(4)} btc`;
      break;
    case 'Ethereum':
      result = usd / ethereum;
      amount = `${result.toFixed(4)} eth`;
      break;
    case 'BNB':
      result = usd / bnb;
      amount = `${result.toFixed(4)} bnb`;
      break;
    case 'USDT':
      result = usd / tether;
      amount = `${result.toFixed(4)} usdt`;
      break;
    default:
      break;
  }

  return amount;
};
 

export async function getAllCryproPrices() { 
  let cryptoPrices
  
  // dispatch(slice.actions.startLoading());
  const URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,tether,solana,0-5x-long-algorand-token,binancecoin,0-5x-long-bitcoin-cash-token,0-5x-long-cardano-token,0-5x-long-cosmos-token,0-5x-long-chainlink-token,0-5x-long-eos-token,0-5x-long-ethereum-classic-token,0-5x-long-kyber-network-token&vs_currencies=usd';

  try {
      const config = {
        method: 'get',
        url: URL,
      };
      const response = await axios(config);
      const { data } = response;
      const cryto = [
        {
         img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-aaveusd.img.svg?alt=media&token=3d67eb33-8250-4cbe-8616-73dea4e8de60',
         Uppername : 'Kyber',
         lowerName : 'KyberUSD',
         price : data['0-5x-long-kyber-network-token'].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-adausd.img.svg?alt=media&token=282c4316-b35f-4667-a008-965903a7dd38',
             Uppername : 'Cardano',
             lowerName : 'ADAUSD',
             price : data['0-5x-long-cardano-token'].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-algousd.img.svg?alt=media&token=d3c4ab1e-4731-438b-9ae4-34ba0bab506e',
             Uppername : 'Algorand',
             lowerName : 'ALGOUSD',
             price : data["0-5x-long-algorand-token"].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-atomusd.img%20(1).svg?alt=media&token=1d46fef6-63ec-45a1-986a-6369d4d65069',
             Uppername : 'Cosmos',
             lowerName : 'ATOMUSD',
             price : data["0-5x-long-cosmos-token"].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-bchusd.img.svg?alt=media&token=b45e9bdc-92f8-4beb-94ea-e8befd98bbd0',
             Uppername : 'Bitcoin Cash',
             lowerName : 'BCHUSD',
             price : data['0-5x-long-bitcoin-cash-token'].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-bnbusd.img%20(2).svg?alt=media&token=3c4bc943-89c4-4538-9992-e52ab36d9e07',
             Uppername : 'BNB',
             lowerName : 'BNBUSD',
             price : data.binancecoin.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-bsvusd.img%20(1).svg?alt=media&token=42383a2d-5dd0-4d25-8dce-7ff766740380',
             Uppername : 'Bitcoin',
             lowerName : 'BTCUSD',
             price : data.bitcoin.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-btcusd.img%20(1).svg?alt=media&token=f6a2d08c-d6ee-4b73-9fff-083da4c6d9a3',
             Uppername : 'BitTorrent',
             lowerName : 'BTTUSD',
             price : 0.00329
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-bttusd.img.svg?alt=media&token=85b582a5-0c2f-4919-8075-f527d7ad8d42',
             Uppername : 'PanCake Swap',
             lowerName : 'CAKEUSD',
             price : 8.0447
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-cakeusd.img.svg?alt=media&token=7ece18b7-c33f-4371-9df8-2a5b9ccc8312',
             Uppername : 'Compound',
             lowerName : 'COMPUSD',
             price : 128.203
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-compusd.img.svg?alt=media&token=d8f10e48-bf22-4612-b05d-5015cf2c2178',
             Uppername : 'Dash',
             lowerName : 'DASHUSD',
             price : 103.0231
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-crousd.img.svg?alt=media&token=b700b418-5bf1-42a2-97a1-24d158448826',
             Uppername : 'Dogecoin',
             lowerName : 'DOGEUSD',
             price : data.dogecoin.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-dotusd.img.svg?alt=media&token=7655feaf-f2bb-4819-bc0e-0f8e130e6eba',
             Uppername : 'Polkadot',
             lowerName : 'DOTUSD',
             price : 17.7163
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-dashusd.img%20(1).svg?alt=media&token=7a2612bd-d875-44b5-93db-526e5e9d58e1',
             Uppername : 'EOS',
             lowerName : 'EOSUSD',
             price : data['0-5x-long-eos-token'].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-dogeusd.img.svg?alt=media&token=0e3046f4-a05e-4f4b-9bca-19135567ca3a',
             Uppername : 'ETH Classic',
             lowerName : 'ETCUSD',
             price : data['0-5x-long-ethereum-classic-token'].usd
         },
         {
             img : " https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-ethusd.img%20(1).svg?alt=media&token=9b3259b4-a7d9-4db3-a93c-c2c24d9fe346",
             Uppername : 'Ethereum',
             lowerName : 'ETHUSD',
             price : data.ethereum.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-filusd.img%20(1).svg?alt=media&token=d0ce3e8a-894a-4842-83df-67cc117c0710',
             Uppername : 'Filecoin',
             lowerName : 'FILUSD',
             price : 19.2259
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-eosusd.img.svg?alt=media&token=f7618b5f-e437-444d-9889-e7a09c3256ea',
             Uppername : 'Internet Computer',
             lowerName : 'ICPUSD',
             price : 16.632
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-etcusd.img.svg?alt=media&token=e867a0b5-3207-46ae-80f9-612c92adb99e',
             Uppername : 'Klaytn',
             lowerName : 'KLAYUSD',
             price : 1.00229
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-etcusd.img.svg?alt=media&token=e867a0b5-3207-46ae-80f9-612c92adb99e',
             Uppername : 'Kusama',
             lowerName : 'KSMUSD',
             price : 154.951
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-linkusd.img%20(1).svg?alt=media&token=2d28630f-ef2e-461f-b105-34c221b6950c',
             Uppername : 'Chainlink',
             lowerName : 'LINKUSD',
             price : data['0-5x-long-chainlink-token'].usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-ltcusd.img%20(1).svg?alt=media&token=d5bd9108-6244-4a32-ad7e-8214eab2f437',
             Uppername : 'Litecoin',
             lowerName : 'LTCUSD',
             price : 104.2967
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-lunausd.img.svg?alt=media&token=69659a91-14f0-4675-95d1-6e4a12e113fa',
             Uppername : 'Terra Luna',
             lowerName : 'LUNAUSD',
             price : 85.257104
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-maticusd.img.svg?alt=media&token=e9cc629d-1287-4389-8974-af544bfcceff',
             Uppername : 'Polygon',
             lowerName : 'MATICUSD',
             price : 1.4237125
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-mkrusd.img.svg?alt=media&token=8ee93dcc-5781-452b-83b4-511ca2bc6e5a',
             Uppername : 'Maker',
             lowerName : 'MKRUSD',
             price : 1877.085
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-neousd.img%20(1).svg?alt=media&token=63d081dc-1ae9-4efc-96ad-642201d9e851',
             Uppername : 'NEO',
             lowerName : 'NEOUSD',
             price : 20.4449
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-runeusd.img.svg?alt=media&token=b6ed85eb-79e7-4f80-8ffe-549f368e0366',
             Uppername : 'THORChain',
             lowerName : 'RUNEUSD',
             price : 7.97799
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-shibusd.img.svg?alt=media&token=ea93a6c2-36a7-4f12-a36c-6d29f57d9401',
             Uppername : 'Shiba Inu',
             lowerName : 'SHIBUSD',
             price : 0.0265073
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-solusd.img%20(1).svg?alt=media&token=46fff4ae-e50f-47f8-8ad1-85a13a55ce5a',
             Uppername : 'Solana',
             lowerName : 'SOLUSD',
             price : data.solana.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-thetausd.img.svg?alt=media&token=b2d31868-5037-4e8f-8377-96e1b3356b25',
             Uppername : 'Tether',
             lowerName : 'THETAUSD',
             price : data.tether.usd
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-trxusd.img.svg?alt=media&token=50e06e85-d77d-4d2d-809c-85107d0f5a58',
             Uppername : 'TRON',
             lowerName : 'TRXUSD',
             price : 20.4449
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-uniusd.img.svg?alt=media&token=6c8f9a0a-7c62-4c8a-b5f3-6768357e46e0',
             Uppername : 'Uniswap',
             lowerName : 'UNIUSD',
             price : 20.4449
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-xlmusd.img%20(1).svg?alt=media&token=c10bc6c9-3a1d-473c-a6ba-47edc463e286',
             Uppername : 'Stellar',
             lowerName : 'XLMUSD',
             price : 0.190953
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-xmrusd.img.svg?alt=media&token=d8e81f1c-ed4d-4a54-b5a3-587bfabfd98c',
             Uppername : 'Monero',
             lowerName : 'XMRUSD',
             price : 232.5813
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-xtzusd.img.svg?alt=media&token=b955d334-074f-406a-b226-96f18eebdbb0',
             Uppername : 'Tezos',
             lowerName : 'XTZUSD',
             price : 20.4449
         },
         {
             img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/assets%2Fpair-icon-zecusd.img.svg?alt=media&token=26d41860-8bf2-4958-94f3-16e72db8e631',
             Uppername : 'ZCash',
             lowerName : 'ZECUSD',
             price : 146.594
         },
         
        ]

        return cryto
      // dispatch(slice.actions.setHomePrices(data));
    } catch (error) {
      console.error('api Error while fetching price', error.message);
    }

    return cryptoPrices
}

