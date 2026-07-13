import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, supportFeedbackApi } from '../utils/Constants';

export const getSupportFeedbackData = createAsyncThunk(
  'getSupportFeedbackData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + supportFeedbackApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const SupportFeedbackSlice = createSlice({
  name: 'supportFeedbackReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearSupportFeedbackData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSupportFeedbackData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSupportFeedbackData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getSupportFeedbackData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSupportFeedbackData } = SupportFeedbackSlice.actions;
export default SupportFeedbackSlice.reducer;
