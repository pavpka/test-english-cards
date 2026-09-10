import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  isAuthenticated: boolean
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated
export default authSlice.reducer
