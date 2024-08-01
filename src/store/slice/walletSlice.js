import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import databaseService from "../../supabase/database"
import { useSelector } from "react-redux"

export const fetchWallet = createAsyncThunk("fetchWallet", async (user_id) => {
    return await databaseService.getWallet({ user_id })
})

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchWallet.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchWallet.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })
        builder.addCase(fetchWallet.rejected, (state) => {
            state.isError = true
        })
    },
})

export default walletSlice.reducer

export const useWallet = () => {
    return useSelector((state) => state.wallet)
}

export const onWalletUpdate = (user_id) => (dispatch) => {
    databaseService.walletUpdate({
        user_id,
        onUpdate: () => dispatch(fetchWallet(user_id)),
    })
}
