import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, forgetPasswordApi } from '../utils/Constants';

export const forgetPassword = createAsyncThunk(
  'forgetPassword',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + forgetPasswordApi;
      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const ForgetPasswordSlice = createSlice({
  name: 'forgetPasswordReducer',
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
      .addCase(forgetPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(forgetPassword.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSendOtpData } = ForgetPasswordSlice.actions;
export default ForgetPasswordSlice.reducer;
