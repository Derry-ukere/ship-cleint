import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';


// deposits
import fundAccountReducer from './slices/deposit/depositFunds';
import getDepositsReducer from './slices/deposit/getDeposits';
import getDepositReducer from './slices/deposit/getDeposit';

// withdrawals
import withdrawFundsReducer from './slices/withdrawals/withdrawFunds';
import withdrawalsReducer from './slices/withdrawals/getWithdrawals';
import cancelWithdrawalsReducer from './slices/withdrawals/cancelWithdrawal';

// asserts
import asserts from './slices/asserts/asserts';  

// user
import emailVerification from './slices/user/emailVerification';
import updateUserDetails from './slices/user/updateDetails';
import resetPassword from './slices/user/resetPassword';

// upload idcards
import uploadId from './slices/uploads/uploadId';
import uploadPaymentProofReducer from './slices/uploads/uploadPaymentProof';
import uploadprofilepic from './slices/uploads/uploadprofilepic';

// TRADERS
import copyTraderReducer from './slices/traders/copyTrader';
import allTraders from './slices/traders/getTraders';

// TRADES
import userTrades from './slices/trades/userTrades';
import registerTradeReducer from './slices/trades/registerTrade';
import personalTrades from './slices/trades/personalTrades';

// shipment

import getShipment from './slices/shipments/getshipment';



// ----------------------------------------------------------------------//

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  // user 
  emailVerification,
  resetPassword,
  updateUserDetails,
  
  // deposits
  fundAccountReducer,
  getDepositsReducer,
  getDepositReducer,

  // withdrawals
  withdrawFundsReducer,
  withdrawalsReducer,
  cancelWithdrawalsReducer,

  // asserts
  asserts,

  // upload
  uploadId,
  uploadprofilepic,
  uploadPaymentProofReducer,

  // TRADERS
  copyTraderReducer,
  allTraders,

  // TRADES
  registerTradeReducer,
  userTrades,
  personalTrades,

  // ship
  getShipment
});

export { rootPersistConfig, rootReducer };
