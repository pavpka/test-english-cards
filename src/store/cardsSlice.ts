import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CardResponse } from '../api/cardsApi';

export type CardsState = (CardResponse & {
    picked?: boolean
})

const initialState: CardsState[] = []

const CardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        set: (_, action: PayloadAction<CardsState[]>) => {
            return action.payload;
        },
        pick: (state, action: PayloadAction<{ id: number }>) => {
            const card = state.find(item => item.id === action.payload.id)
            if (card) card.picked = !card.picked;
        }
    }
})

export const { set, pick } = CardsSlice.actions
export default CardsSlice.reducer
