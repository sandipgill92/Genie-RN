import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, accountSettingApi } from '../utils/Constants';

export const accountSettingData = createAsyncThunk(
  'accountSettingData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + accountSettingApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const AccountSettingSlice = createSlice({
  name: 'accountSettingReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearAccountSettingData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(accountSettingData.pending, state => {
        state.isLoading = true;
      })
      .addCase(accountSettingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(accountSettingData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAccountSettingData } = AccountSettingSlice.actions;
export default AccountSettingSlice.reducer;
