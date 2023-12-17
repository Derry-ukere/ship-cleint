/* eslint-disable consistent-return */
// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {  getFirestore, getDocs, collection, query, where,orderBy, limit } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  personalTrades : null
};

const slice = createSlice({
  name: 'personal-trades',
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
    // PERSONAL TRADES 
    gotAllPersonalTrades(state, payload) {
      state.personalTrades = payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ------------------------------------------------------------------- //


export const fetchPersonalTrades = () => {
  const auth = getAuth();
  const userId = auth.currentUser.uid
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // Create a query against the collection.
      const container = [];
      const q = query(collection(DB, 'trades'), where('userId', '==', userId),where('status', '==', 'PENDING'),orderBy('createdAt','desc'), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.gotAllPersonalTrades(container));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
      console.error(errorMessage)
    }
   
  };
}
