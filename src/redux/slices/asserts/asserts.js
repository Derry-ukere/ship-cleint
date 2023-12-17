// firebase
import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';



// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  homePrices: null,
};

const slice = createSlice({
  name: 'asserts',
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
    success(state, {payload}) {
      state.isLoading = false;
      state.homePrices = payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading} = slice.actions;

// ----------------------------------------------------------------------

export function getHomePrices() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const URL =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,binancecoin,tether,solana&vs_currencies=usd';
  
    try {
        const config = {
          method: 'get',
          url: URL,
        };
        const response = await axios(config);
        const { data } = response;
        dispatch(slice.actions.success(data));
      } catch (error) {
        dispatch(slice.actions.error(error.message));
      }
  };
}

