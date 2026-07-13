import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, remindersApi } from '../utils/Constants';

export const getReminderData = createAsyncThunk(
  'getReminderData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + remindersApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const ReminderSlice = createSlice({
  name: 'reminderReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearReminderData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getReminderData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getReminderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getReminderData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearReminderData } = ReminderSlice.actions;
export default ReminderSlice.reducer;
