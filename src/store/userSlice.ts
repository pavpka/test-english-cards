import { createSlice } from '@reduxjs/toolkit'

type User = {
    name: string,
    dateOfBirth: string | null,
    gender: 'W' | 'M'| null
}

const initialState: User = {
    name: 'Admin',
    dateOfBirth: null,
    gender: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setDate: (state, action) => {
            const date = new Date(action.payload.date)
            state.dateOfBirth = date.toDateString();

        },
        setGender: (state, action) => {
            state.gender = action.payload.gender;
        }
    }
})

export const { setName, setDate, setGender } = UserSlice.actions
export default UserSlice.reducer
