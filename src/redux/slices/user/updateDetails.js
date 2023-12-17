/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit';
import { doc, updateDoc, getFirestore } from "firebase/firestore";
// import { updateCandididate } from '../../utils/authUtils';

import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';
import { dispatch } from '../../store';
// -------------------------------------------------------//

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);


const initialState = {
  isLoading: false,
  error: null,
  success: false
};

const slice = createSlice({
  name: 'updateUser',
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

    // Update  Candidate
    success(state) {
      state.isLoading = false;
      state.success = true;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, handleClose } = slice.actions;

// ----------------------------------------------------------------------

export  function updateUser(userInfo) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const auth = getAuth()
      const {
        country,
        City,
        state,
        number,
        postCode
      } = userInfo

      const washingtonRef = doc(DB, "users", `${auth.currentUser.uid}`);
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        city: City,
        post_code: postCode,
        state,
        country,
        mobile_number: `${number}`
      })
      dispatch(slice.actions.success());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

