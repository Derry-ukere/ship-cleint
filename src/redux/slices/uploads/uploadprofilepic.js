/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';
import { uploadTask } from '../../../utils/uploadTask';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'deposit',
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
    uploadComplete(state) {
      state.isLoading = false;
      state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, } = slice.actions;

// ----------------------------------------------------------------------


export function uploadProfilePic(file) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const auth = getAuth()
    try { 
      uploadTask(file).then(async (url) => {
        const userRef = doc(DB, "users", `${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          profilePhoto: url,
        });
        dispatch(slice.actions.uploadComplete());
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

