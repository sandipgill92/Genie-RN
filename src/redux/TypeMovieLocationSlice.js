import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, typeMovieKingstonApi } from '../utils/Constants';

export const typeMovieLocation = createAsyncThunk(
  'typeMovieLocation',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + typeMovieKingstonApi;
      const response = await axios.get(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const TypeMovieLocationSlice = createSlice({
  name: 'typeMovieLocationReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearTypeMovieLocationData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(typeMovieLocation.pending, state => {
        state.isLoading = true;
      })
      .addCase(typeMovieLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(typeMovieLocation.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearTypeMovieLocationData } = TypeMovieLocationSlice.actions;
export default TypeMovieLocationSlice.reducer;
