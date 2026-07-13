import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, sportTicketApi } from '../utils/Constants';

export const getSportTicketData = createAsyncThunk(
  'getSportTicketData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + sportTicketApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const SportTicketSlice = createSlice({
  name: 'sportTicketReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearSportTicketData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSportTicketData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSportTicketData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getSportTicketData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSportTicketData } = SportTicketSlice.actions;
export default SportTicketSlice.reducer;
