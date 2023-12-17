// firebase
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

import { createSlice } from '@reduxjs/toolkit';

//
import { dispatch } from '../../store';

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  sentRestPasswordEmail: false,
};

const slice = createSlice({
  name: 'resetPassword',
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
      state.sentRestPasswordEmail = true;
    },
    // SUCCESS
    handleClose(state) {
      state.sentRestPasswordEmail = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, handleClose } = slice.actions;

// ----------------------------------------------------------------------

export function sendResetPasswordEmail(email) {
  const auth = getAuth();
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await sendPasswordResetEmail(auth, email);
      // Email verification sent!
      dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
};

