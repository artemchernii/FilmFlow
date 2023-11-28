/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('account_id', action.payload.id);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.sessionId = '';
      state.user = {};
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
export const userSelector = (state) => state.user;
