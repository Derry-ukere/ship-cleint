// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore,serverTimestamp} from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  depositComplete: false,
  walletId: null,
  cyptoAmount: null,
  id: null,
  allDeposits: null,
  qrCode : null
};

const slice = createSlice({
  name: 'deposit-funds',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Send reset password email
    success(state) {
      state.isLoading = false;
      state.depositComplete = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function depositFunds(options) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const { amountEntered, paymemnetCoin, amountInCrypto, paymentAddress, destinantion, depositId, user,qrCode } = options;
    const auth = getAuth();
    try {
      await setDoc(doc(DB, 'deposits', `${depositId}`), {
        id: depositId,
        user_id: auth.currentUser.uid,
        amount: amountEntered,
        currency: 'USD',
        paymentMethod: paymemnetCoin,
        amountInCrypto,
        status: 'pending',
        isApproved: false,
        isUrl: false,
        paymentAddress,
        destinantion,
        proof: '',
        createdByAdmin: 0,
        name: user,
        qrCode,
        deleted_at: null,
        createdAt : serverTimestamp(),
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }).then(() => {
        dispatch(slice.actions.success());
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log('error',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
   return  depositId;
  };
};

