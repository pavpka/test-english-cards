import { configureStore, createSlice } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import authReducer from './authSlice'

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {},
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
