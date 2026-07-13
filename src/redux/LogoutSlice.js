// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, loginApi } from '../utils/Constants';

export const LogoutUser = createAsyncThunk('LogoutUser', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + loginApi;
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const LogoutSlice = createSlice({
  name: 'logoutReducer',
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearLogoutUserData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LogoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(LogoutUser.rejected, state => {
        state.isError = false;
      });
  },
});

export const { clearLogoutUserData } = LogoutSlice.actions;
export default LogoutSlice.reducer;
