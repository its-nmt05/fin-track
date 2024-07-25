import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stocks: [],
}

const stockSlice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload
        },
    },
})

export const { setStocks } = stockSlice.actions

export default stockSlice.reducer
