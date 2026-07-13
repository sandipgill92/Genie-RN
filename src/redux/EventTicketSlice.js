import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, eventTicketApi } from '../utils/Constants';

export const eventTicketData = createAsyncThunk(
  'eventTicketData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + eventTicketApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const EventTicketSlice = createSlice({
  name: 'eventTicketReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearEventTicketData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(eventTicketData.pending, state => {
        state.isLoading = true;
      })
      .addCase(eventTicketData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(eventTicketData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearEventTicketData } = EventTicketSlice.actions;
export default EventTicketSlice.reducer;
