// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore,serverTimestamp} from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
//
import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';


const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  withdrawalComplete: false,
};

const slice = createSlice({
  name: 'withdraw-funds',
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

    // Success
    success(state) {
      state.isLoading = false;
      state.withdrawalComplete = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, } = slice.actions;

// --------------------------------------------------------------------- //

export function withdrawFunds(options,balance, currentAmount) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const { from,  amount, paymentMethod, walletAddress, clientName } = options;
    console.log('Clientname', clientName)
    const auth = getAuth();
    const uuid = uuidv4();
    const withdrawalId = uuid;

    if((balance === 0) || (balance < currentAmount)){
      dispatch(slice.actions.hasError('Deposit account before you make  Withdrawal !'));
      return;
      }
    try {
      await setDoc(doc(DB, 'withdrawals', `${withdrawalId}`), {
        id: withdrawalId,
        user_id: auth.currentUser.uid,
        Clientname : clientName,
        amount,
        walletAddress,
        paymentMethod,
        isApproved: false,
        from,
        network : paymentMethod,
        status : 'pending',
        createdAt : serverTimestamp(),
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }).then(() => {
        dispatch(slice.actions.success());
      });
    } catch (error) { 
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}


