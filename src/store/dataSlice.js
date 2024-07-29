import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stocks: [],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload
        },
    },
})

export const { setStocks } = dataSlice.actions

export default dataSlice.reducer
