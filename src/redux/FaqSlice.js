import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, faqApi } from '../utils/Constants';

export const getFaqData = createAsyncThunk('getFaqData', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + faqApi;
    const response = await axios.get(url, { params: payload }, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const FaqSlice = createSlice({
  name: 'faqReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearFaqData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFaqData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getFaqData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getFaqData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearFaqData } = FaqSlice.actions;
export default FaqSlice.reducer;
