import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, registerApi } from '../utils/Constants';

export const registerUser = createAsyncThunk('registerUser', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + registerApi;
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const RegisterSlice = createSlice({
  name: 'registerReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearRegisterData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearRegisterData } = RegisterSlice.actions;
export default RegisterSlice.reducer;
