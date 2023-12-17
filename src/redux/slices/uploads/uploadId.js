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
  name: 'upload-id',
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
    success(state) {
        state.isLoading = false;
        state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------



export function uploadIds(fileOne, FileTwo) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const auth = getAuth()
    try {
      uploadTask(fileOne).then(async (url) => {
        const userRef = doc(DB, 'users', `${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          photo_front_view: url,
        });
      });
      uploadTask(FileTwo).then(async (url) => {
        const userRef = doc(DB, 'users', `${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          photo_back_view: url,
        });
        dispatch(slice.actions.success());
      });
   
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
