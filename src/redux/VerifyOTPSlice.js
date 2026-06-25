import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, verifyOtpApi } from '../utils/Constants';

export const verifyOtp = createAsyncThunk('verifyOtp', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + verifyOtpApi;
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const VerifyOTPSlice = createSlice({
  name: 'verifyOtpReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearVerifyOtpData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyOtp.pending, state => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(verifyOtp.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearVerifyOtpData } = VerifyOTPSlice.actions;
export default VerifyOTPSlice.reducer;
