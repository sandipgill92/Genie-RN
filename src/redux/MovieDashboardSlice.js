import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, movieDashboardApi } from '../utils/Constants';

export const movieDashboard = createAsyncThunk(
  'movieDashboard',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + movieDashboardApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const MovieDashboardSlice = createSlice({
  name: 'movieDashboardReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearMovieDashboardData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(movieDashboard.pending, state => {
        state.isLoading = true;
      })
      .addCase(movieDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(movieDashboard.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearMovieDashboardData } = MovieDashboardSlice.actions;
export default MovieDashboardSlice.reducer;
