import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.status = true
            state.user = action.payload.user
        },
        clearUser: (state) => {
            state.status = false
            state.user = null
        },
    },
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
