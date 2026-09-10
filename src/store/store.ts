import { configureStore, createSlice } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import authReducer from './authSlice'
import cardsReducer from './cardsSlice'

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {},
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
