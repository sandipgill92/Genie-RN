import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, voucherApi } from '../utils/Constants';

export const getVoucherData = createAsyncThunk(
  'getVoucherData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + voucherApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const VoucherSlice = createSlice({
  name: 'voucherReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearVoucherData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getVoucherData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getVoucherData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getVoucherData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearVoucherData } = VoucherSlice.actions;
export default VoucherSlice.reducer;
