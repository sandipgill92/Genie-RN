import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, paymentSettingsApi } from '../utils/Constants';

export const getPaymentSettingData = createAsyncThunk(
  'getPaymentSettingData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + paymentSettingsApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const PaymentSettingSlice = createSlice({
  name: 'paymentSettingReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearPaymentSettingData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPaymentSettingData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPaymentSettingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getPaymentSettingData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearPaymentSettingData } = PaymentSettingSlice.actions;
export default PaymentSettingSlice.reducer;
