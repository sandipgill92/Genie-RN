import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, movieTicketApi } from '../utils/Constants';

export const getMovieTicketData = createAsyncThunk(
  'getMovieTicketData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + movieTicketApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const MovieTicketSlice = createSlice({
  name: 'movieTicketReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearMovieTicketData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMovieTicketData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMovieTicketData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMovieTicketData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearMovieTicketData } = MovieTicketSlice.actions;
export default MovieTicketSlice.reducer;
