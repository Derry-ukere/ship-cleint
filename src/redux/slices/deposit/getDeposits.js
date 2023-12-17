// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where,orderBy, limit } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  allDeposits: null,
};

const slice = createSlice({
  name: 'get-deposits',
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

    success(state, payload) {
      state.isLoading = false;
      state.allDeposits = payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------


export function getAllDeposits() {
  return async () => {
    const auth = getAuth();
    const userID = auth.currentUser.uid;
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      // Create a query against the collection.
      const q = query(collection(DB, 'deposits'), where('user_id', '==', userID), orderBy('created_at','desc'), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });

      dispatch(slice.actions.success(container));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
      console.log(errorMessage);
    }
  };
};

