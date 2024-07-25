import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import stockSlice from "./stockSlice"

const store = configureStore({
    reducer: { auth: authSlice, stock: stockSlice },
})

export default store
