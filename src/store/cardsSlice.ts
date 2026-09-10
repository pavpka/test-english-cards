import { createSlice } from '@reduxjs/toolkit'
import type { CardResponse } from '../api/cardsApi';

export type CardsState = (CardResponse & {
    picked: boolean
})

const initialState: CardsState[] = []

const CardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        set: (_, action) => {
            return action.payload;
        },
        pick: (state, action) => {
            const card = state.find(item => item.id === action.payload.id)
            if (card) card.picked = true;
        }
    }
})

export const { set, pick } = CardsSlice.actions
export default CardsSlice.reducer
