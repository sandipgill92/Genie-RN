import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, supportTicketApi } from '../utils/Constants';

export const createSupportTicket = createAsyncThunk(
  'createSupportTicket',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + supportTicketApi;
      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const SupportTicketSlice = createSlice({
  name: 'supportTicketReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearSupportTicketData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createSupportTicket.pending, state => {
        state.isLoading = true;
      })
      .addCase(createSupportTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createSupportTicket.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSupportTicketData } = SupportTicketSlice.actions;
export default SupportTicketSlice.reducer;
