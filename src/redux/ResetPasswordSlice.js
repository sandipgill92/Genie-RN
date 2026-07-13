import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, resetPasswordApi } from '../utils/Constants';

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + resetPasswordApi;
      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const ResetPasswordSlice = createSlice({
  name: 'resetPasswordReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearResetPasswordData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(resetPassword.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearResetPasswordData } = ResetPasswordSlice.actions;
export default ResetPasswordSlice.reducer;
