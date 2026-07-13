import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, reviewsApi } from '../utils/Constants';

export const getReviewData = createAsyncThunk(
  'getReviewData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + reviewsApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const ReviewSlice = createSlice({
  name: 'reviewReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearReviewData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getReviewData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getReviewData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getReviewData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearReviewData } = ReviewSlice.actions;
export default ReviewSlice.reducer;
