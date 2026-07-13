import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiBaseUrl, profileApi } from '../utils/Constants';

export const profileData = createAsyncThunk('profileData', async payload => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const url = ApiBaseUrl + profileApi;
    const response = await axios.get(url, { params: payload }, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const ProfileSlice = createSlice({
  name: 'profileReducer',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearProfileData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(profileData.pending, state => {
        state.isLoading = true;
      })
      .addCase(profileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(profileData.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearProfileData } = ProfileSlice.actions;
export default ProfileSlice.reducer;
