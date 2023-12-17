// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs,where, collection, query} from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  shipment : null
};

const slice = createSlice({
  name: 'get-shipment',
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
    // success state
    success(state, action) {
        console.log("action", action)
        state.isLoading = false;
        state.shipment = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------


export function getshipment(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    console.log('id', id)

    try {
        const container = []
        const q = query(collection(DB, 'shipments'), where('trackingNumber', '==', id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
        if (container) {
            dispatch(slice.actions.success(container[0]));
          } else {
            dispatch(slice.actions.hasError('invalid tracking number'));
          }
        console.log('shipment', container.length)
        // return container[0].subscribers.includes(auth.currentUser.uid)
      } catch (error) {
        const errorMessage = error.message;
        console.error(errorMessage)
        dispatch(slice.actions.hasError(errorMessage));
      }
  };
}


