import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import databaseService from "../../supabase/database"
import { useSelector } from "react-redux"

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
            state.data = action.payload.data
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

export const onPortfolioUpdate = (portfolio_id, user_id) => (dispatch) => {
    databaseService.portfolioUpdate({
        portfolio_id,
        onUpdate: () => dispatch(fetchPortfolio(user_id)),
    })
}
