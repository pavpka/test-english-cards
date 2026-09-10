import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token');

type AuthState = {
  isAuthenticated: boolean
  token: string | null,
  username: string | null,
}

const initialState: AuthState = {
  isAuthenticated: !!token,
  token: token || null,
  username: "Admin"
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated
export default authSlice.reducer
