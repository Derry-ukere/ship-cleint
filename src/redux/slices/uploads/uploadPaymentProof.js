/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

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
  name: 'upload-proof',
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
    uploadPaymentComplete(state) {
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

export function uploadPaymentProof(file, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      uploadTask(file).then(async (url) => {
        const userRef = doc(DB, 'deposits', `${id}`);
        await updateDoc(userRef, {
          isUrl: true,
          proof: url,
        });
        dispatch(slice.actions.uploadPaymentComplete());
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
};

