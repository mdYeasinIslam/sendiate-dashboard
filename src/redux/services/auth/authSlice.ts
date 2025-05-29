import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  // user: null | { email?: string; name?: string; token: string };
  token: null | string;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice;