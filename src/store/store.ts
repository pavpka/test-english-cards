import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cardsReducer from './cardsSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cards: cardsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
