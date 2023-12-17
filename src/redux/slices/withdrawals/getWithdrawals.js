// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';


import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';


const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  allWithdrawals: null,
};

const slice = createSlice({
  name: 'get-withdrawal',
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
    
    // SUCCESS
    success(state, payload) {
      state.isLoading = false;
      state.allWithdrawals = payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ---------------------------------------------------------------- //

export function getAllWithdrawals() {
  return async () => {
    const auth = getAuth();
    const userID = auth.currentUser.uid;
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'withdrawals'), where('user_id', '==', userID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.success(container));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
};
