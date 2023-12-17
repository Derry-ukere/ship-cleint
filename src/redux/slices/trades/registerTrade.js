/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore,serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';
import {getCurrentPrices} from '../../../utils/cureency-converter'

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  buying: false,
  selling: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'create Trade',
  initialState,
  reducers: {
    // START LOADING
    startBuying(state) {
      state.buying = true;
    },
    startSelling(state) {
      state.selling = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.selling = false;
      state.buyng = false;
      state.error = action.payload;
    },

    // Send reset password email
    successful(state) {
      state.buying = false;
      state.selling = false;
      state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------
 
  export function registerTrade(options) {
    return async () => {
      if(options.positions === 'UP'){
        dispatch(slice.actions.startBuying());
      }else{
        dispatch(slice.actions.startSelling());
      }
      
      try {
   
          const {amountEntered, positions, currencyPair, traderId, imgUrl, userId,} = options;
          const cryptoPrice = await getCurrentPrices();
          
          // create trade
          const d = new Date();
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
          try {
            const uuid = uuidv4();
            const tradeId = uuid;
            setDoc(doc(DB, 'trades', `${tradeId}`), {
              id: traderId,
              amount: amountEntered,
              positions,
              currencyPair,
              userId,
              status : 'PENDING',
              tradernAME : 'SELF',
              imageUrl:imgUrl,
              day: d.getDate(),
              rate : cryptoPrice.bitcoin.usd,
              month :months[d.getMonth()],
              timestamp: d.getTime(),
              createdAt : serverTimestamp(),
            }).then(() => {
                console.log('it was succesfull')
                dispatch(slice.actions.successful());
           });
        
         } catch (error) {
           const errorMessage = error.message;
           dispatch(slice.actions.hasError(errorMessage));
         }
      } catch (error) {
        const errorMessage = error.message;
        console.error('err', errorMessage)
        dispatch(slice.actions.hasError(errorMessage));
      }
    };
  }
