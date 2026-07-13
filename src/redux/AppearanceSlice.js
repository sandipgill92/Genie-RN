import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, appearanceApi } from '../utils/Constants';

export const getAppearanceData = createAsyncThunk(
  'getAppearanceData',
  async payload => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const url = ApiBaseUrl + appearanceApi;
      const response = await axios.put(url, { params: payload }, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const AppearanceSlice = createSlice({
  name: 'appearanceReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearAppearanceData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAppearanceData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAppearanceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAppearanceData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAppearanceData } = AppearanceSlice.actions;
export default AppearanceSlice.reducer;
