/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit';
import { doc,getFirestore,deleteDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';
import { dispatch } from '../../store';
// -------------------------------------------------------//

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

const initialState = {
  isLoading: false,
  error: null,
  success : false,
};

const slice = createSlice({
  name: 'candidate',
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
      state.success = true
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, updateCandidateSuccess } = slice.actions;

// -------------------------------------------------- //


export const deleteWithdrawal = (id) => async () => {
    dispatch(slice.actions.startLoading());
    try {
      await deleteDoc(doc(DB, "withdrawals", `${id}`)).then(() => {
        console.log('deleted trader')
      })
      dispatch(slice.actions.success());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
