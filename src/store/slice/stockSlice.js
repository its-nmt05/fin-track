import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import databaseService from "../../supabase/database"
import { useSelector } from "react-redux"

export const fetchStocks = createAsyncThunk("fetchStocks", async () => {
    return await databaseService.getStocks()
})

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const stockSlice = createSlice({
    name: "stock",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStocks.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchStocks.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })
        builder.addCase(fetchStocks.rejected, (state) => {
            state.isError = true
        })
    },
})

export const useStocks = () => {
    return useSelector((state) => state.stock)
}

export default stockSlice.reducer
