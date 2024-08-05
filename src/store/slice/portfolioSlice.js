import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import databaseService from "../../supabase/database"
import { useSelector } from "react-redux"
import { filterStocks } from "../../utils/helper"

export const fetchPortfolio = createAsyncThunk(
    "fetchPortfolio",
    async (user_id) => {
        return await databaseService.getPortfolio({ user_id })
    }
)

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPortfolio.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchPortfolio.fulfilled, (state, action) => {
            state.isLoading = false
            // send the data (stocks, transactions) to the store
            const data = filterStocks(action.payload[0].data)
            data["transactions"] = action.payload[1].data.portfolio_transaction
            state.data = data
        })
        builder.addCase(fetchPortfolio.rejected, (state) => {
            state.isError = true
        })
    },
})

export default portfolioSlice.reducer

export const usePortfolio = () => {
    return useSelector((state) => state.portfolio)
}

export const onPortfolioUpdate = (user_id) => (dispatch) => {
    databaseService.portfolioUpdate({
        onUpdate: () => {
            dispatch(fetchPortfolio(user_id))
        },
    })
}
