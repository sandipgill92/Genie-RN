import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, walletApi } from '../utils/Constants';

export const getWalletData = createAsyncThunk(
  'getWalletData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + walletApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const WalletSlice = createSlice({
  name: 'walletReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearWalletData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWalletData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWalletData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getWalletData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearWalletData } = WalletSlice.actions;
export default WalletSlice.reducer;
