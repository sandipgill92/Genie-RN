import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, sendOtpApi } from '../utils/Constants';

export const sendOtp = createAsyncThunk('sendOtp', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + sendOtpApi;
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const SendOTPSlice = createSlice({
  name: 'sendOtpReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearSendOtpData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => {
        state.isLoading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sendOtp.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSendOtpData } = SendOTPSlice.actions;
export default SendOTPSlice.reducer;
