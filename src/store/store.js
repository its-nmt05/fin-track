import { configureStore } from "@reduxjs/toolkit"

import authSlice from "./slice/authSlice"
import stockSlice from "./slice/stockSlice"
import walletSlice from "./slice/walletSlice"
import portfolioSlice from "./slice/portfolioSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        stock: stockSlice,
        wallet: walletSlice,
        portfolio: portfolioSlice,
    },
})

export default store
