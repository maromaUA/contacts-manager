import { createSlice } from '@reduxjs/toolkit';
import {
  registerOperation,
  logInOperation,
  logOutOperation,
  refreshUserOperation,
  changeSettingsOperation,
} from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerOperation.fulfilled](state, action) {
      state.user = action.payload.user;
      // state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logInOperation.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOutOperation.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUserOperation.pending](state) {
      state.isRefreshing = true;
    },
    [refreshUserOperation.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUserOperation.rejected](state) {
      state.isRefreshing = false;
    },

    [changeSettingsOperation.fulfilled]: (state, { payload }) => {
      const keys = Object.keys(payload);
      const values = Object.values(payload);
      keys.forEach((key, index) => {
        state.user[key] = values[index];
      });
    },
  },
});

export const authReducer = authSlice.reducer;
